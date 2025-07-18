const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the project root (for your image)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>GlowNUS Website</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; font-family: Arial, sans-serif; background: #f8fafc; }
        .navbar {
          display: flex;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          padding: 0 24px;
          height: 64px;
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          margin-right: 16px;
        }
        .hamburger span {
          height: 4px;
          width: 28px;
          background: #312e81;
          margin: 3px 0;
          border-radius: 2px;
          transition: 0.3s;
        }
        .brand {
          font-size: 1.1rem;
          color: #312e81;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .dropdown {
          display: none;
          position: absolute;
          top: 64px;
          left: 16px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 8px;
          min-width: 180px;
          z-index: 100;
        }
        .dropdown a {
          display: block;
          padding: 14px 24px;
          color: #312e81;
          text-decoration: none;
          font-size: 1rem;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.2s;
        }
        .dropdown a:last-child {
          border-bottom: none;
        }
        .dropdown a:hover {
          background: #f3f4f6;
        }
        @media (min-width: 600px) {
          .dropdown {
            left: 24px;
          }
        }
      </style>
    </head>
    <body>
      <nav class="navbar">
        <div class="hamburger" id="hamburger" tabindex="0" aria-label="Open menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="brand">GLOW NUS</span>
        <div class="dropdown" id="dropdown">
          <a href="#about">About Us</a>
          <a href="#mission">Our Mission</a>
          <a href="#contact">Contact us</a>
          <a href="#team">Founding Team</a>
        </div>
      </nav>
      <main style="padding:40px; text-align:center;">
        <img class="banner" src="/GlowNusBanner.png" alt="GLOW Banner" style="width:100%;max-width:700px;display:block;margin:30px auto;">
        <h2>Welcome to the GlowNUS website!</h2>
        <p>Enjoy your stay.</p>
      </main>
      <script>
        const hamburger = document.getElementById('hamburger');
        const dropdown = document.getElementById('dropdown');
        let open = false;
        hamburger.onclick = () => {
          open = !open;
          dropdown.style.display = open ? 'block' : 'none';
          hamburger.setAttribute('aria-expanded', open);
        };
        // Optional: close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
            open = false;
            hamburger.setAttribute('aria-expanded', false);
          }
        });
      </script>
    </body>
    </html>
  `);
});

//Routing Drop down//
render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mission" component={Our Mission} />
          <Route path="/founding" component={Founding Team} />
          <Route path="/contact" component={Contact Us} />
          <Route path="/events" component={Events} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

//break//
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});