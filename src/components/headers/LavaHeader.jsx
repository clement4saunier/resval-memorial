import { createSignal, useContext } from 'solid-js';
import { ThemeContext, ThemeProvider, useTheme } from '../context/ThemeProvider';
import Section from '../layout/Section';
import styles from './LavaHeader.module.css';
import silhouette from '../../assets/silhouette.svg';
import ThemeTabs from './decorations/ThemeTabs';
import Divider from './decorations/Divider';
import Icon from '../Icon';

function LavaHeader() {
  const { cycleTheme, theme } = useContext(ThemeContext);
  const [playing, setPlaying] = createSignal(true);

  function onPlanetClick() {
    console.log("playing:", playing());
    setPlaying(p => !p);
  }

  return (
    <Section class={styles.container}>
      <div class={styles.leftBottomBar}>
        <Divider height={4} />
        <Divider height={4} width={4} />
        <Divider height={4} />
        <ThemeTabs />
        <Divider height={4} />
        <Divider height={4} width={4} />
        <Divider height={48} width={14} />
        <Divider height={4} width={4} />
        <Divider height={4} width={8} />
      </div>
      <div class={styles.themes}><button onClick={cycleTheme}>{"<"}</button ><button onClick={cycleTheme}>{theme()}</button><button onClick={cycleTheme}>{">"}</button></div>
      <div class={styles.noise}></div>

      <div class={styles.title}>
        <Divider vertical />
        <Divider vertical />
        <div class="card">memorial.resval.eth</div>
        <Divider vertical />
        <div class="card">r.e.p</div>
      </div>
      <div class={styles.connectWallet}>
        <button>connecter</button>
      </div>
      <div class={styles.luv}>
        <div>
          <img src={silhouette} />
        </div>
      </div>
      <div class={styles.chainInfo}>
        <div class={[styles.card, "card"].join(" ")}>
          mainnet
        </div>
        <div class={[styles.card, "card"].join(" ")}>
          763091281 •
        </div>
      </div>
      <div class={styles.planet}>
        <div class={styles.sphere} onClick={onPlanetClick}>
          <Icon material={playing() ? "play_arrow" : "pause"} style={{ 'font-size': "48px", color: "var(--color-header-light)" }} />
        </div>
        <div class=''>
          Pour l'éternité.
          <div style={{ height: "var(--space-m)" }} />
          <Divider height={4} />
          <div style={{ height: "var(--space-m)" }} />
          <Divider height={4} width={8} />
        </div>
        {/* <textarea style={{width: "48ch"}}/> */}
      </div>
    </Section>
  );
}

export default LavaHeader;
