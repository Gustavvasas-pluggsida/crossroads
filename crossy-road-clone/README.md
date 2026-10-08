# Crossy Road Clone

A simple web-based clone of the popular game Crossy Road, built with HTML, CSS, and JavaScript.

## How to Play

- Use the arrow keys to move the chicken (player) up, down, left, or right.
- Avoid hitting the moving cars (red rectangles).
- Reach the top of the screen to increase your score and reset the level.
- The game ends when you collide with a car.

## Embedding in GitHub Pages

Follow these steps to host this game on GitHub Pages:

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and sign in.
   - Click the "+" icon in the top-right corner and select "New repository".
   - Choose a repository name (e.g., `crossy-road-clone`).
   - Optionally add a description.
   - Keep the repository public (required for free GitHub Pages).
   - Click "Create repository".

2. **Push the Code to GitHub**
   - Open a terminal or command prompt and navigate to the project folder:
     ```bash
     cd path/to/crossy-road-clone
     ```
   - Initialize a git repository:
     ```bash
     git init
     ```
   - Add all files:
     ```bash
     git add .
     ```
   - Commit the files:
     ```bash
     git commit -m "Initial commit: Crossy Road clone"
     ```
   - Add the remote repository (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     ```
   - Push to GitHub:
     ```bash
     git push -u origin master
     ```
     (If your default branch is `main`, use `git push -u origin main`)

3. **Enable GitHub Pages**
   - On GitHub, navigate to your repository.
   - Click the "Settings" tab.
   - In the left sidebar, click "Pages".
   - Under "Source", select the branch you pushed to (usually `master` or `main`) and the `/ (root)` folder.
   - Click "Save".
   - GitHub will provide a URL where your site is published (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`).

4. **Play the Game**
   - Visit the provided URL to play your Crossy Road clone.

## Development

To modify the game:
- Edit `index.html` for structure.
- Edit `style.css` for styling.
- Edit `script.js` for game logic.

After making changes, commit and push to GitHub to update the live site.

## Credits

This is a simple educational clone inspired by the original Crossy Road game by Hipster Whale.

Enjoy!