import { test } from 'vitest';
import { createToggle } from './index';

test('createToggle should create a toggle with the initial state', () => {
    const [toggleStore] = createToggle(true);
    assert.equal(toggleStore.getState(), true);
});

test('createToggle should toggle the state on event trigger with a boolean payload', () => {
    const [toggleStore, toggleEvent] = createToggle(true);

    toggleEvent(false);
    assert.equal(toggleStore.getState(), false);

    toggleEvent(true);
    assert.equal(toggleStore.getState(), true);
});

test('createToggle should toggle the state on event trigger with an unknown payload', () => {
    const [toggleStore, toggleEvent] = createToggle(true);

    toggleEvent(); // no payload, should toggle
    assert.equal(toggleStore.getState(), false);

    toggleEvent(42 as unknown); // unknown payload, should toggle
    assert.equal(toggleStore.getState(), true);
});
