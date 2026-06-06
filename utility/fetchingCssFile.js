export async function loadCss(url) {
  const response = await fetch(url);
  const css = await response.text();
  return css;
}
