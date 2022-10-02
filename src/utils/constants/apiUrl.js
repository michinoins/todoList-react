var url = '';
if (process.env.NODE_ENV === 'production') {
  url = 'https://backend-node-dot-semiotic-axis-363920.de.r.appspot.com';
} else {
  url = 'http://localhost:3000';
}

export const baseApiUrl = url;
