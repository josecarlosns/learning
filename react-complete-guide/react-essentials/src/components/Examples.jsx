import { useState } from 'react';

import { BUTTONS, EXAMPLES } from '../data';
import { TabButton } from './TabButton';
import { Section } from './Section';
import Tabs from './Tabs';

const DEFAULT_TAB_INDEX = 0;

export function Examples() {
  const [state, setState] = useState({
    currentTab: BUTTONS[DEFAULT_TAB_INDEX].key,
  });

  function handleSelect(buttonKey) {
    setState({ currentTab: buttonKey });
  }

  return (
    <Section title="Examples" id="examples">
      <Tabs
        buttons={BUTTONS.map(({ title, key }) => (
          <TabButton
            key={key}
            isSelected={state.currentTab === key}
            onClick={() => handleSelect(key)}
          >
            {title}
          </TabButton>
        ))}
      >
        {
          <div id="tab-content">
            <h3>{EXAMPLES[state.currentTab].title}</h3>
            <p>{EXAMPLES[state.currentTab].description}</p>
            <pre>
              <code>{EXAMPLES[state.currentTab].code}</code>
            </pre>
          </div>
        }
      </Tabs>
    </Section>
  );
}
