import React, { useState, useEffect, useCallback } from 'react';
import '../../App.css';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const USER = import.meta.env.VITE_LASTFM_USER;
const BASE = 'https://ws.audioscrobbler.com/2.0/';
const RECENT_URL = `${BASE}?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=10`;
const TOP_TRACKS_URL = `${BASE}?method=user.gettoptracks&user=${USER}&api_key=${API_KEY}&format=json&period=7day&limit=8`;
const TOP_ALBUMS_URL = `${BASE}?method=user.gettopalbums&user=${USER}&api_key=${API_KEY}&format=json&period=7day&limit=8`;

interface TrackImage {
  '#text': string;
  size: string;
}

interface RecentTrackDate {
  uts?: string;
  '#text'?: string;
}

interface RecentTrack {
  name: string;
  artist: { '#text': string };
  image?: TrackImage[];
  date?: RecentTrackDate;
  '@attr'?: { nowplaying?: string };
}

interface TopTrack {
  name: string;
  artist: { name: string };
  image?: TrackImage[];
  playcount?: string;
  '@attr'?: { rank: string };
}

interface TopAlbum {
  name: string;
  artist: { name: string };
  image?: TrackImage[];
  playcount?: string;
  '@attr'?: { rank: string };
}

function getImageUrl(images: TrackImage[] | undefined, size: 'extralarge' | 'large' | 'medium' | 'small' = 'large'): string {
  if (!images?.length) return '';
  const order = ['extralarge', 'large', 'medium', 'small'];
  const idx = order.indexOf(size);
  for (let i = idx; i < order.length; i++) {
    const img = images.find((x) => x.size === order[i]);
    if (img?.['#text']) return img['#text'];
  }
  return images[images.length - 1]?.['#text'] ?? '';
}

function formatRelativeTime(uts: string | undefined): string {
  if (!uts) return '—';
  const now = Math.floor(Date.now() / 1000);
  const then = parseInt(uts, 10);
  const diff = now - then;
  if (diff < 60) return 'hace un momento';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`;
  return `hace ${Math.floor(diff / 604800)} sem`;
}

const MusicPage: React.FC = () => {
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [topAlbums, setTopAlbums] = useState<TopAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!API_KEY || !USER) {
      setError('Missing Last.fm config');
      setLoading(false);
      return;
    }
    try {
      const [recentRes, tracksRes, albumsRes] = await Promise.all([
        fetch(RECENT_URL),
        fetch(TOP_TRACKS_URL),
        fetch(TOP_ALBUMS_URL),
      ]);

      const [recentData, topTracksData, albumsData] = await Promise.all([
        recentRes.json() as Promise<{ recenttracks?: { track?: RecentTrack[] } }>,
        tracksRes.json() as Promise<{ toptracks?: { track?: TopTrack[] } }>,
        albumsRes.json() as Promise<{ topalbums?: { album?: TopAlbum[] } }>,
      ]);

      const tracks = recentData.recenttracks?.track;
      setRecentTracks(Array.isArray(tracks) ? tracks : []);

      const topTracksList = topTracksData.toptracks?.track;
      setTopTracks(Array.isArray(topTracksList) ? topTracksList : []);

      const albums = albumsData.topalbums?.album;
      setTopAlbums(Array.isArray(albums) ? albums : []);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      setRecentTracks([]);
      setTopTracks([]);
      setTopAlbums([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) {
    return (
      <div className="music-page">
        <div className="music-page-bg" aria-hidden />
        <div className="stars-layer">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
        </div>
        <div className="music-loading">
          <div className="music-loading-pixel" aria-hidden />
          <p className="music-loading-text">LOADING DATA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="music-page">
        <div className="music-page-bg" aria-hidden />
        <div className="stars-layer">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
        </div>
        <h1 className="music-page-title music-page-title--glitch" data-text="SONIC ARCHIVES">SONIC ARCHIVES</h1>
        <div className="music-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="music-page">
      <div className="music-page-bg" aria-hidden />
      <div className="stars-layer">
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
      </div>
      <div className="music-page-inner">
        <h1 className="music-page-title music-page-title--glitch" data-text="WEEKLY ROTATION">WEEKLY ROTATION</h1>

        {/* Sección 1: Recent Tracks */}
        <section className="music-section-block" aria-labelledby="music-recent-heading">
          <h2 id="music-recent-heading" className="music-section-title">RECENT TRACKS</h2>
          <div className="music-recent-list">
            {recentTracks.length === 0 ? (
              <p className="music-section-empty">No hay temas recientes.</p>
            ) : (
              recentTracks.map((track, index) => (
                <React.Fragment key={`recent-${index}-${track.name}-${track.artist['#text']}`}>
                  <div className="music-recent-row">
                    <button type="button" className="music-recent-play" aria-label="Reproducir">
                      <i className="fas fa-play" aria-hidden />
                    </button>
                    <div className="music-recent-art">
                      {getImageUrl(track.image, 'small') ? (
                        <img src={getImageUrl(track.image, 'small')} alt="" width={40} height={40} loading="lazy" />
                      ) : (
                        <div className="music-recent-art-placeholder">
                          <i className="fas fa-music" aria-hidden />
                        </div>
                      )}
                    </div>
                    <span className="music-recent-title">{track.name}</span>
                    <span className="music-recent-artist">{track.artist['#text']}</span>
                    <span className="music-recent-time">
                      {track['@attr']?.nowplaying === 'true' ? 'Ahora' : formatRelativeTime(track.date?.uts)}
                    </span>
                  </div>
                  {index < recentTracks.length - 1 && <div className="music-recent-sep" />}
                </React.Fragment>
              ))
            )}
          </div>
        </section>

        {/* Sección 2: La música más escuchada (Top Tracks) */}
        <section className="music-section-block" aria-labelledby="music-toptracks-heading">
          <h2 id="music-toptracks-heading" className="music-section-title">La música más escuchada</h2>
          <div className="music-artists-grid">
            {topTracks.length === 0 ? (
              <p className="music-section-empty">No hay datos.</p>
            ) : (
              topTracks.map((track, index) => (
                <article key={`track-${index}-${track.name}-${track.artist.name}`} className="music-artist-card">
                  <div className="music-artist-card-bg">
                    {getImageUrl(track.image) ? (
                      <img src={getImageUrl(track.image)} alt="" loading="lazy" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="music-artist-card-placeholder">
                        <i className="fas fa-music" aria-hidden />
                      </div>
                    )}
                  </div>
                  <div className="music-artist-card-overlay">
                    <span className="music-artist-card-name">{track.name}</span>
                    <span className="music-artist-card-count">{track.artist.name}</span>
                    {track.playcount != null && (
                      <span className="music-artist-card-count">{track.playcount} reproducciones</span>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Sección 3: Top Albums (7 days) */}
        <section className="music-section-block" aria-labelledby="music-albums-heading">
          <h2 id="music-albums-heading" className="music-section-title">TOP ALBUMS (7 DAYS)</h2>
          <div className="music-albums-grid">
            {topAlbums.length === 0 ? (
              <p className="music-section-empty">No hay datos.</p>
            ) : (
              topAlbums.map((album, index) => (
                <article key={`album-${index}-${album.name}-${album.artist.name}`} className="music-album-card">
                  <div className="music-album-card-bg">
                    {getImageUrl(album.image) ? (
                      <img src={getImageUrl(album.image)} alt="" loading="lazy" />
                    ) : (
                      <div className="music-album-card-placeholder">
                        <i className="fas fa-compact-disc" aria-hidden />
                      </div>
                    )}
                  </div>
                  <div className="music-album-card-overlay">
                    <span className="music-album-card-name">{album.name}</span>
                    <span className="music-album-card-artist">{album.artist.name}</span>
                    {album.playcount != null && (
                      <span className="music-album-card-count">{album.playcount} reproducciones</span>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicPage;
