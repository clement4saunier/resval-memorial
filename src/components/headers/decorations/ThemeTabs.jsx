import { useTheme } from '../../context/ThemeProvider';
import styles from './ThemeTabs.module.css';

function ThemeTabs() {
    const { themes, themeIndex } = useTheme();

    return (
        <div class={["card", styles.container].join(" ")}>
            {themes.map((_, i) => <div class={[styles.round, i === themeIndex() ? styles.selected : ""].join(" ")}></div>)}
        </div>
    );
}

export default ThemeTabs;
