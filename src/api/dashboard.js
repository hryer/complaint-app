import config from 'src/config';

const getTokens = async () => {
  const res = await fetch(config.urlTokens);
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`);
  }
  const rows = await res.json();

  const tokens = {};
  for (let row of rows) {
    tokens[row.name] = row.feeder_token;
  }
  return tokens;
}

export default {
  getTokens,
}
