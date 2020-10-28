import '../../src/vaadin-select';

const select = document.createElement('vaadin-select');

const expectBoolean = (value: boolean) => {
  return typeof value === 'boolean';
};

const expectString = (value: string) => {
  return typeof value === 'string';
};

select.addEventListener('opened-changed', (event) => {
  expectBoolean(event.detail.value);
});

select.addEventListener('invalid-changed', (event) => {
  expectBoolean(event.detail.value);
});

select.addEventListener('value-changed', (event) => {
  expectString(event.detail.value);
});
