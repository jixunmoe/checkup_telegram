import app from './app.mjs';

app.main().catch((err) => {
  console.error(err);
  process.exit(1);
});
