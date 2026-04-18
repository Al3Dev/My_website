import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LASTFM_API_KEY as API_KEY, LASTFM_USER as USER } from '../../config/lastfm';
const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`;

interface TrackImage {
  '#text': string;
  size: string;
}

interface TrackAttr {
  nowplaying?: string;
}

interface Track {
  name: string;
  artist: { '#text': string };
  album?: { '#text': string };
  image?: TrackImage[];
  '@attr'?: TrackAttr;
}

interface LastFmResponse {
  recenttracks?: {
    track?: Track[];
  };
}

function getAlbumArtUrl(track: Track | null): string {
  if (!track?.image?.length) return '';
  const extralarge = track.image.find((i) => i.size === 'extralarge');
  const large = track.image.find((i) => i.size === 'large');
  const medium = track.image.find((i) => i.size === 'medium');
  const img = extralarge ?? large ?? medium ?? track.image[track.image.length - 1];
  return img?.['#text'] ?? '';
}


function LastFmWidget() {
  const navigate = useNavigate();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    if (!API_KEY || !USER) {
      setError('Missing Last.fm config');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(API_URL);
      const data: LastFmResponse = await res.json();
      const tracks = data.recenttracks?.track;
      if (Array.isArray(tracks) && tracks.length > 0) {
        setTrack(tracks[0]);
        setError(null);
      } else {
        setTrack(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      setTrack(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  const isNowPlaying = track?.['@attr']?.nowplaying === 'true';
  const statusLabel = isNowPlaying ? '🔴 NOW PLAYING' : '⏸ LAST PLAYED';
  const albumArtUrl = getAlbumArtUrl(track);
  const songName = track?.name ?? '—';
  const artistName = track?.artist['#text'] ?? '—';
  const titleLong = songName.length > 20;

  const handleClick = () => {
    navigate('/music');
  };

  return (
    <div 
      className="lastfm-widget"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate('/music');
        }
      }}
    >
      <div
        className="lastfm-bg"
        style={
          albumArtUrl
            ? { backgroundImage: `url(${albumArtUrl})` }
            : undefined
        }
        aria-hidden
      />
      <div className="lastfm-overlay" aria-hidden />
      <div className="lastfm-scanlines" aria-hidden />
      <div className="lastfm-content">
        <div className="lastfm-art-center">
          {albumArtUrl ? (
            <img
              src={albumArtUrl}
              alt=""
              className="lastfm-art-center-img"
              loading="lazy"
            />
          ) : (
            <div className="lastfm-art-center-placeholder">
              <i className="fas fa-music" aria-hidden />
            </div>
          )}
        </div>
        <div
          className={`lastfm-status ${isNowPlaying ? 'lastfm-status--live' : ''}`}
        >
          {statusLabel}
        </div>
        <div className="lastfm-track-wrap">
          <div
            className={`lastfm-title-marquee ${titleLong ? 'lastfm-title-marquee--scroll' : ''}`}
          >
            <span className="lastfm-title-text">{songName}</span>
            {titleLong && (
              <>
                <span className="lastfm-title-sep"> — </span>
                <span className="lastfm-title-text lastfm-title-dupe" aria-hidden>
                  {songName}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="lastfm-artist">{artistName}</div>
      </div>
      {loading && <div className="lastfm-loading">...</div>}
      {error && <div className="lastfm-error">{error}</div>}
    </div>
  );
}

export default LastFmWidget;
