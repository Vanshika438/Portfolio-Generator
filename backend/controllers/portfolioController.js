import fs from "fs";
import path from "path";

export const generatePortfolio = async (req, res) => {
    try {
        const { name, profession, about, skills, projects, theme, profilePic } = req.body;

        if (!name || !profession || !about || !skills || !projects) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const folderName = name.replace(/\s+/g, "_").toLowerCase();
        const folderPath = `generated/${folderName}`;

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // ✅ Generate CSS based on selected theme
        const cssContent = `
            * {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    list-style: none;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 0%;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

.logo {
    margin-left: 5px;
    font-size: 25px;
    color: white;
    font-weight: 600;
    transition: 0.3s ease;
}

.logo:hover {
    color: orangered;
    text-shadow: 0 0 25px orangered;
}

span {
    color: orangered;
}

.navbar a {
    font-size: 18px;
    color: white;
    font-weight: 500;
    margin: 0 20px;
    border-bottom: 3px solid transparent;
    transition: 0.3s ease;
}

.navbar a:hover {
    color: orangered;
    border-bottom: 3px solid orangered;
}

#home {
    width: 100%;
    min-height: 100vh;
    background: rgb(241, 241, 241);
    display: flex;
    align-items: center;
    gap: 7em;
    padding: 30px 12% 0;
}

.home-content {
    max-width: 800px;
}

.home-content h3 {
    font-size: 42px;
}

.home-content h1 {
    font-size: 62px;
    line-height: 1.2;
}

.home-content p {
    font-size: 18px;
    margin: 25px 0 30px;
}
#About {
    display: flex;
    justify-content: center;
    background-color: black;
    align-items: center;
    padding: 12% 8%;
    gap: 10em;

}

.about-content h2 {
    text-align: left;
    color: white;
    font-size: 42px;
}

.about-content p {
    color: white;
    font-size: 20px;
    margin: 2em 0 3em;

}
.footer {
    position: relative;
    bottom: 0;
    width: 100%;
    padding: 40px 0;
    background-color: black;
}

.footer .social{
    text-align: center;
    padding-bottom: 25px;
    color: white;
}

.footer .social a {
    font-size: 24px;
    color: white;
    border: 2px solid orangered;
    width: 40px;
    height: 40px;
    line-height: 38px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    margin: 0 8px;
    box-shadow: inset 0 0 10px orangered, 0 0 10px orangered;
    transition: 0.3s ease;
}

.footer,
.social a:hover {
    transform: scale(1.2)translateY(-10px);
    color: orangered;
    border: 2px solid orangered;
}

.footer ul {
    margin-top: 0;
    padding: 0;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 0;
    text-align: center;
}

.footer ul li a {
    color: white;
    border-bottom: 3px solid transparent;
    transition: 0.3 ease;
}

.footer ul li a:hover {
    color: orangered;
    border-bottom: 3px solid orangered;

}

.footer ul li {
    display: inline;
    padding: 0 15px;
}
        `;

        // ✅ Generate HTML content
        const htmlContent = `
           <!DOCTYPE html>
           <html lang="en">
           <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>${name}'s Portfolio</title>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
           <link rel="stylesheet" href="styles.css">
           </head>

           <body>
           <header class="header">
           <a href="#" class="logo"><span>${name}</span></a>
           <nav class="navbar">
            <a href="#home">Home</a>
            <a href="#About">About me</a>
           </nav>
           </header>
           <section id="home">
           <div class="home-content">
            <h3>Hello,</h3>
            <h1>I am <span>${name}<br>A Passionate ${profession}.</span></h1>
           </div>
          </section>
          <section id="About">
          <div class="about-img">
            <img src="${profilePic}" alt="img">
          </div>
          <div class="about-content">
            <h2 class="heading">About <span>Me</span></h2>
            <p>${about}</p>

          </div>
          </section>
          <hr>
          <footer class="footer">
          <div class="social">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
          <ul class="list">
            <li><a href="#">FAQ</a></li>
            <li><a href="#About">About me</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          </footer>
          </body>

          </html>`;

        // ✅ Save HTML & CSS files
        fs.writeFileSync(`${folderPath}/index.html`, htmlContent);
        fs.writeFileSync(`${folderPath}/styles.css`, cssContent);

        res.json({ message: "Portfolio generated successfully!", filePath: `${folderPath}/index.html` });
    } catch (error) {
        console.error("❌ Error generating portfolio:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
