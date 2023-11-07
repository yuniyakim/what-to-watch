import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { AuthorizationStatus, RoutePath } from '../../types/enums';
import './main-page.scss';
import { GenresCatalogue } from '../../components/genres-catalogue/genres-catalogue';
import { FilmsList } from '../../components/films-list/films-list';
import { genres } from '../../mocks/genres';
import { Button } from '../../components/button/button';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { getPromoFilmAction } from '../../store/api-actions';

const FILMS_TO_SHOW_AMOUNT = 8;
store.dispatch(getPromoFilmAction());

export const MainPage = () => {
  const activeGenreFilms = useAppSelector((state) => state.currentFilms);
  const promoFilm = useAppSelector((state) => state.promoFilm);

  if (!promoFilm) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header authorizationStatus={AuthorizationStatus.Auth} headerClassName="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <Button
                  buttonClassName="btn--play"
                  buttonLink={`/${RoutePath.Player}/${promoFilm.id}`}
                  svgHref="#play-s"
                >
                  <span>Play</span>
                </Button>
                <Button
                  buttonClassName="btn--list"
                  buttonLink={`/${RoutePath.MyList}`}
                  svgHref="#add"
                >
                  <>
                    <span>My list</span>
                    <span className="film-card__count">9</span>
                  </>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresCatalogue genres={genres} />

          <FilmsList films={activeGenreFilms} amountToShow={FILMS_TO_SHOW_AMOUNT} />
        </section>

        <Footer />
      </div>
    </div>
  );
};
