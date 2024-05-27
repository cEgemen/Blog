# Project Overview

Our project is a blog site. The site's programming is done with JavaScript, the interface is designed with React, and database operations are handled with Firebase. The project includes features such as UI design, Object-Oriented Programming, Object-Relational Mapping, Web Service connection, Role-Based Access, and User authentication. Users on the site are divided into three categories: authors, readers, and admins. Authors can add text content to the site and delete the content they have added. Admins have authority over all content. Readers can only read the published content.

## Steps to Work with GitHub Codespaces

### Open Your Project in Codespaces:

Go to your project repository on GitHub.com.
Click the "Code" button on the repository's main page.
In the dropdown menu, select "Open with Codespaces."
Create a new Codespace or open an existing one.

### Use the Development Environment:

Once the Codespace is open, you'll see a fully-featured Visual Studio Code environment.
Open the terminal by pressing Ctrl + or by selecting Terminal > New Terminal from the menu.
Run the following commands to install dependencies and start your project:
npm install
npm start
These commands will start the project and allow you to test it in the browser.

## Usage

This project provides a platform where users can write, read, and manage blog posts. Below are step-by-step instructions on how to use the project.

### 1. Login and Registration

- **Registration Page:**
  - When you start the project, you will first encounter the login or registration page.
  - If you are a new user, you can create an account by filling out the registration form.
  - If you already have an account, you can log in to continue.

### 2. Homepage

After logging in, you will be directed to different homepages depending on your user type:

- **Reader:**
  - Once logged in, you will be directed to a page listing the blogs you can read.
  - You can filter blogs by category.

- **Writer:**
  - Once logged in, you will be directed to a page where you can add new blog posts.
  - You can write blogs based on the category of your choice.
  - You can edit or delete the blogs you have previously written.

- **Admin:**
  - As an admin, you will have access to a control panel where you can manage all blogs and users.
  - You have full authority over all content and users.

### 3. User Profile

- **Profile Management:**
  - After logging into your account, you can access your user profile.
  - From the profile page, you can change your user type (e.g., from reader to author).
  - You can update your personal information.

### 4. Blog Management (for Writers)

- **Writing a New Blog:**
  - Click on the "Write New Blog" button to create a new blog post.
  - Fill in details like title, content, and category to create and publish your blog post.

- **Editing and Deleting Blogs:**
  - From the page listing your previously written blogs, select the blog you want to edit or delete.
  - You can edit the blog and save the changes or delete it entirely.

### 5. Admin Controls

- **Managing All Content:**
  - As an admin, you can edit or delete all users' blog posts.
  - You can manage user account information and change user types.
- **Admin Login:**
  - Use the following credentials to log in as an admin:
    - **Username:** admin
    - **Password:** admin

By following these steps, you can efficiently use and manage the project. If you encounter any issues or need more information, please refer to the project documentation.
