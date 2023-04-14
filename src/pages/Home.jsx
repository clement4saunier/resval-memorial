import { createMemo, createSignal } from 'solid-js';
import { ThemeContext, ThemeProvider } from '../components/context/ThemeProvider';
import LavaHeader from '../components/headers/LavaHeader';
import Section from '../components/layout/Section';
import styles from './Home.module.css';
import Icon from '../components/Icon';

function Home() {

  const themes = ["mustafar", "aznvr", "zlm", "noire", "nebuleuse"];
  const [themeIndex, setThemeIndex] = createSignal(0);
  const theme = createMemo(() => themes[themeIndex()]);

  function cycleTheme() {
    let nextIndex = themeIndex() + 1;

    if (nextIndex >= themes.length) nextIndex = 0;
    setThemeIndex(nextIndex);
  }

  function setTheme(i) {
    if (i >= themes.length) i = 0;
    setThemeIndex(i);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, themeIndex, cycleTheme }}>
      <div class={theme()} style={{ "background-color": "var(--color-content-background)" }}>
        <div class={styles.App}>
          <header>
            <LavaHeader />
            <Section class={styles.mint}>
              <p>
                A jamais dans nos coeurs, à jamais on-chain.

              </p>
              <p>
                <button><Icon material="history_edu" /> Graver un message</button>
              </p>
            </Section>
          </header>
          <Section>
            <h1>Un mémorial à la gloire de Luv</h1>
            <p>
              Un message gravé sur la blockchain Ethereum est immuable et persitent, cela en fait l'endroit parfait pour y inscrire des messages de receuil.
            </p>
          </Section>
          <Section>
            <h1>Comment ça marche ?</h1>
            <p>
              Une fois que vous avez rentré votre message, le mémorial vous proposera de signer une transaction avec votre wallet, votre message et sa provenance est conservée dans un NFT qui vous ai donné.
              <br/>
              <br/>
              Chaque opération sur la blockchain recquiert du 'gaz', une somme en ETH qui correspond au coût de fonctionnement de votre intéraction, ainsi plus votre message est long plus il coûtera de ressources à inscrire.
              <br/>
              <br/>
              Aucun frais ne revient aux créateurs de ce mémorial, il s'agit d'une initiative de la communauté pour faire vivre la mémoire de notre artiste préferé.
            </p>
          </Section>
          <Section>
            <h1>Comment ça marche ?</h1>
            <p>
              Ce site est

            </p>
          </Section>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Home;
