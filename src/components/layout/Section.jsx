import { useTheme } from '../context/ThemeProvider';
import styles from './Section.module.css';

function Section({children, class: c, ...props}) {
  return (
    <section class={[styles.section, c].join(" ")}>
      {children}
    </section>
  );
}

export default Section;
