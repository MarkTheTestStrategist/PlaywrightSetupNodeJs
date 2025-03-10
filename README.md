# PlaywrightSetup - Detaching and Creating a New Repo

This guide explains how to clone this repository, detach it from the original fork, and create a new repository using this as your baseline.

## Step 1: Clone the Repository

First, clone this repository to your local machine using Git.

```sh
git clone https://github.com/YOUR-USERNAME/PlaywrightSetup.git
cd PlaywrightSetup
```

> Replace `YOUR-USERNAME` with your GitHub username.

## Step 2: Detach the Repository

To detach the repository from the original fork, remove the existing Git remote and initialize a new one.

```sh
rm -rf .git
git init
```

This will:
- Remove all Git history and association with the original repository.
- Initialize a fresh Git repository in the same folder.

> **Note:** If the `rm -rf .git` command does not work, you can manually delete the `.git` folder by:
- Navigating to your project folder.
- Enabling hidden files/folders if necessary.
- Deleting the `.git` folder directly.

## Step 3: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/new) and create a new repository.
2. Name your repository as desired.
3. Do **not** initialize it with a README, `.gitignore`, or license.

## Step 4: Connect Your Local Project to the New Repository

Back in your terminal, add the new remote and push your code.

```sh
git remote add origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPO.git
git add .
git commit -m "Initial commit based on PlaywrightSetup"
git push -u origin main
```

Replace:
- `YOUR-USERNAME` with your GitHub username.
- `YOUR-NEW-REPO` with the name of your new repository.

## Step 4 (Alternative): Detach and Create a New Repository Using GitKraken

If you prefer using GitKraken, follow these steps:

1. **Open GitKraken** and navigate to `File > Clone Repo`.
2. Clone the repository using the URL: `https://github.com/YOUR-USERNAME/PlaywrightSetup.git`.
3. Once cloned, open the repository in GitKraken.
4. Detach it by selecting `File > Init Repo`. This will initialize a new Git repository without any connection to the original.
5. In GitKraken, go to `File > Init Repo` again and choose the option to create a new GitHub repository.
6. GitKraken will automatically push the code to your new repository without needing to create it manually on GitHub.

## Step 5: Verify Your Setup

Go to your new repository on GitHub and verify that:
- The code has been pushed successfully.
- There is no reference to the original fork.

## Step 6: Start Customizing Your Project

You are now free to customize the project as needed without any link to the original PlaywrightSetup repository.

---

? Done! You have successfully detached the repository and created a new one based on PlaywrightSetup.

