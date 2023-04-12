import { createSignal, createContext, useContext, createMemo } from "solid-js";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const themes = ["aznvr", "zlm", "noire", "nebuleuse", "mustafar"];
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
        <ThemeContext.Provider value={{ theme, setTheme, themeIndex, cycleTheme }}>
            <div class={theme()} style={{"background-color": "var(--color-content-background)"}}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() { return useContext(ThemeContext); }