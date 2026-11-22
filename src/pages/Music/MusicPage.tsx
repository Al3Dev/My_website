import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiClock, FiDisc, FiHeadphones, FiMusic, FiRefreshCw } from 'react-icons/fi';
import { buildMusicPageUrls, LASTFM_USER, type MusicPeriod } from '../../config/lastfm';
import './MusicPage.css';

interface MusicItem {
  name: string;
  url?: string;
  image?: { '#text': string; size: string }[];
}

interface RecentTrack extends MusicItem {
  artist: { '#text': string };
  album?: { '#text': string };
  date?: { uts?: string };
  '@attr'?: { nowplaying?: string };
}

interface RankedItem extends MusicItem {
  artist: { name: string };
  playcount?: string;
}

type Feed<T> = { status: 'loading' | 'error' | 'ready'; items: T[] };
const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' });
const timeFormat = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeStyle: 'short' });
const numberFormat = new Intl.NumberFormat('es-MX');
const periods: { value: MusicPeriod; label: string }[] = [
  { value: '7day', label: '7 días' },
  { value: '1month', label: '30 días' },
  { value: '12month', label: '12 meses' },
];
const username = LASTFM_USER?.trim();
const profile = username ? `https://www.last.fm/user/${encodeURIComponent(username)}` : 'https://www.last.fm/';

function useFeed<T>(url: string | undefined, group: string, itemKey: string, refresh: number): Feed<T> {
  const [result, setResult] = useState<{ url: string; refresh: number; feed: Feed<T> }>();

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    async function load(requestUrl: string) {
      try {
        const response = await fetch(requestUrl, { signal: controller.signal });
        if (!response.ok) throw new Error('Last.fm no respondió');
        const data = await response.json();
        const items = data?.[group]?.[itemKey];
        if (data?.error || !Array.isArray(items)) throw new Error('Respuesta incompleta de Last.fm');
        if (!controller.signal.aborted) setResult({ url: requestUrl, refresh, feed: { status: 'ready', items } });
      } catch {
        if (!controller.signal.aborted) setResult({ url: requestUrl, refresh, feed: { status: 'error', items: [] } });
      }
    }
    void load(url);
    return () => controller.abort();
  }, [url, group, itemKey, refresh]);

  if (!url) return { status: 'error', items: [] };
  if (result?.url !== url || result.refresh !== refresh) return { status: 'loading', items: [] };
  return result.feed;
}

function musicLink(item: MusicItem, artist: string) {
  return item.url && /^https:\/\/(?:www\.)?last\.fm\/music\//i.test(item.url)
    ? item.url
    : `https://www.last.fm/search?q=${encodeURIComponent(`${item.name} ${artist}`)}`;
}

function coverUrl(item: MusicItem) {
  return ['extralarge', 'large', 'medium', 'small']
    .map(size => item.image?.find(entry => entry.size === size)?.['#text'])
    .find(src => src?.startsWith('https://') && !src.includes('2a96cbd8b46e442fc41c2b86b821562f'));
}

function Cover({ item, eager = false }: { item: MusicItem; eager?: boolean }) {
  const image = coverUrl(item);
  return (
    <span className="listening-cover" aria-hidden="true">
      <FiDisc />
      {image && <img src={image} alt="" loading={eager ? 'eager' : 'lazy'} onError={event => { event.currentTarget.hidden = true; }} />}
    </span>
  );
}

function TrackDate({ track }: { track: RecentTrack }) {
  if (track['@attr']?.nowplaying === 'true') return <span className="listening-live">En escucha</span>;
  const date = new Date(Number(track.date?.uts) * 1000);
  if (!Number.isFinite(date.getTime())) return null;
  return <time dateTime={date.toISOString()} title={timeFormat.format(date)}>{dateFormat.format(date)}</time>;
}

function FeedMessage({ status, empty }: { status: Feed<unknown>['status']; empty: string }) {
  return (
    <p className="listening-message" role="status">
      {status === 'loading' ? 'Cargando desde Last.fm…' : status === 'error' ? 'No se pudo cargar desde Last.fm.' : empty}
    </p>
  );
}

function Plays({ count }: { count?: string }) {
  const plays = Number(count);
  if (!count || !Number.isFinite(plays)) return null;
  return <small>{numberFormat.format(plays)} {plays === 1 ? 'escucha' : 'escuchas'}</small>;
}

export default function MusicPage() {
  const [period, setPeriod] = useState<MusicPeriod>('1month');
  const [refresh, setRefresh] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const urls = buildMusicPageUrls(period);
  const recent = useFeed<RecentTrack>(urls?.recent, 'recenttracks', 'track', refresh);
  const tracks = useFeed<RankedItem>(urls?.topTracks, 'toptracks', 'track', refresh);
  const albums = useFeed<RankedItem>(urls?.topAlbums, 'topalbums', 'album', refresh);
  const latest = recent.items[0];
  const latestCover = latest ? coverUrl(latest) : undefined;
  const live = latest?.['@attr']?.nowplaying === 'true';

  return (
    <main className="listening-page">
      <div className="listening-shell">
        <header className="listening-hero">
          <div className="listening-intro">
            <span className="listening-source"><FiHeadphones aria-hidden="true" /> AlleRoDI en Last.fm</span>
            <h1>En rotación</h1>
            <p>Mi historial de escucha y la música a la que siempre vuelvo.</p>
            <a className="listening-external" href={profile} target="_blank" rel="noreferrer">
              Ver en Last.fm <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="listening-feature">
            {latestCover && <img className="listening-feature-background" src={latestCover} alt="" onError={event => { event.currentTarget.hidden = true; }} />}
            {latest ? (
              <a className="listening-feature-track" href={musicLink(latest, latest.artist['#text'])} target="_blank" rel="noreferrer">
                <Cover item={latest} eager />
                <span className={live ? 'listening-live' : 'listening-feature-label'}>
                  {live ? 'Escuchando ahora' : 'Última escucha'}
                </span>
                <span className="listening-item-text">
                  <strong>{latest.name}</strong>
                  <small>{latest.artist['#text']}</small>
                  {latest.album?.['#text'] && <small>{latest.album['#text']}</small>}
                  {!live && <TrackDate track={latest} />}
                </span>
                <FiArrowUpRight className="listening-feature-arrow" aria-hidden="true" />
              </a>
            ) : <FeedMessage status={recent.status} empty="Todavía no hay escuchas registradas." />}
          </div>
        </header>

        <div className="listening-columns">
          <section className="listening-history" aria-labelledby="listening-history">
            <div className="listening-section-head">
              <h2 id="listening-history"><FiClock aria-hidden="true" /> Historial reciente</h2>
              <button className="listening-refresh" type="button" onClick={() => setRefresh(value => value + 1)}
                disabled={!urls || [recent, tracks, albums].some(feed => feed.status === 'loading')}>
                <FiRefreshCw aria-hidden="true" /> Actualizar
              </button>
            </div>
            {recent.items.length ? (
              <ol className="listening-rows">
                {recent.items.slice(0, showAll ? undefined : 8).map((track, index) => (
                  <li key={`${track.date?.uts ?? 'live'}-${track.name}-${index}`}>
                    <a className="listening-row" href={musicLink(track, track.artist['#text'])} target="_blank" rel="noreferrer">
                      <Cover item={track} />
                      <span className="listening-item-text"><strong>{track.name}</strong><small>{track.artist['#text']}</small></span>
                      <TrackDate track={track} />
                      <FiArrowUpRight className="listening-row-arrow" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            ) : <FeedMessage status={recent.status} empty="No hay escuchas recientes." />}
            {recent.items.length > 8 && (
              <button className="listening-more" type="button" aria-expanded={showAll} onClick={() => setShowAll(value => !value)}>
                {showAll ? 'Mostrar menos' : `Ver las ${recent.items.length} escuchas`}
              </button>
            )}
          </section>

          <section className="listening-rankings" aria-labelledby="listening-rankings">
            <div className="listening-section-head">
              <h2 id="listening-rankings"><FiMusic aria-hidden="true" /> Lo más escuchado</h2>
            </div>
            <div className="listening-periods" role="group" aria-label="Período de canciones y álbumes">
              {periods.map(({ value, label }) => (
                <button key={value} type="button" aria-pressed={period === value} onClick={() => setPeriod(value)}>{label}</button>
              ))}
            </div>
            <h3>Canciones</h3>
            {tracks.items.length ? (
              <ol className="listening-ranked">
                {tracks.items.map((track, index) => (
                  <li key={`${track.artist.name}-${track.name}-${index}`}>
                    <a href={musicLink(track, track.artist.name)} target="_blank" rel="noreferrer">
                      <span className="listening-rank" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <span className="listening-item-text"><strong>{track.name}</strong><small>{track.artist.name}</small></span>
                      <Plays count={track.playcount} />
                    </a>
                  </li>
                ))}
              </ol>
            ) : <FeedMessage status={tracks.status} empty="No hay canciones en este período." />}
            <h3>Álbumes</h3>
            {albums.items.length ? (
              <ol className="listening-albums">
                {albums.items.map((album, index) => (
                  <li key={`${album.artist.name}-${album.name}-${index}`}>
                    <a href={musicLink(album, album.artist.name)} target="_blank" rel="noreferrer">
                      <Cover item={album} />
                      <span className="listening-item-text"><strong>{album.name}</strong><small>{album.artist.name}</small><Plays count={album.playcount} /></span>
                    </a>
                  </li>
                ))}
              </ol>
            ) : <FeedMessage status={albums.status} empty="No hay álbumes en este período." />}
          </section>
        </div>
      </div>
    </main>
  );
}
