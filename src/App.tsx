import { useState } from "react";
import styles from "./App.module.scss";

import ToggleView from "./components/ToggleView";
import ToggleViewOnGrid from "./components/ToggleViewOnGrid";

function App() {
  const [count, setCount] = useState(-1);
  const [countInner, setCountInner] = useState(-1);
  const [opened, setOpened] = useState(false);


  return (
    <div className={styles.App}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cum et
        explicabo modi omnis possimus quisquam recusandae tenetur unde
        voluptatem! Alias amet asperiores consequatur doloribus eum
        exercitationem, maiores quis voluptate?
      </p>
      <ToggleView animateTime={300}>
        {count === 1 && (
          <div>
            <div className={styles.card}>123</div>
            {countInner === 1 && <div className={styles.card}>222</div>}
          </div>
        )}
      </ToggleView>
      <ToggleView animateTime={300}>
        {count === -1 && (
          <div>
            <div className={styles.card2}>123</div>
            {countInner === -1 && <div className={styles.card2}>222</div>}
          </div>
        )}
      </ToggleView>
      <div style={{ padding: 10 }}>
        <button onClick={() => setCount((prev) => -prev)}>Toggle</button>
        <button onClick={() => setCountInner((prev) => -prev)}>
          Toggle inner
        </button>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cum et
        explicabo modi omnis possimus quisquam recusandae tenetur unde
        voluptatem! Alias amet asperiores consequatur doloribus eum
        exercitationem, maiores quis voluptate?
      </p>


        <button onClick={() => setOpened(!opened)}>Slide</button>
        <ToggleViewOnGrid isOpen={opened}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cum et
                explicabo modi omnis possimus quisquam recusandae tenetur unde
                voluptatem! Alias amet asperiores consequatur doloribus eum
                exercitationem, maiores quis voluptate?
            </p>
        </ToggleViewOnGrid>
        <ToggleViewOnGrid isOpen={!opened}>
            <p>
                Other text<br />
                 s<br />
                df<br />
                sdf<br />
                 sd<br />
                f<br />
                sdf<br />
            </p>
        </ToggleViewOnGrid>
    </div>
  );
}

export default App;
