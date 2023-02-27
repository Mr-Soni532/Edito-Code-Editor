# sleepy-machine-4490

# Real Time Code Editor with WebSockets

### Description
This is a web application that provides a real-time code editor with three windows for HTML, CSS, and JavaScript. Users can write, edit and preview their code all in one place. Additionally, the application includes a login functionality for secure access to the editor. The application also allows the user to switch between different layout options for their coding environment. All of these features are enabled through the use of WebSockets, which allow for real-time communication between the client and server.

### Technologies Used
- Node.js
- Express.js
- Socket.io
- HTML
- CSS
- JavaScript

### Installation
1. Clone the repository from GitHub:

```
git clone https://github.com/Mr-Soni532/sleepy-machine-4490.git
```

2. Install the dependencies:
```
npm install
```

3. Start the server:
```
npm server
```

4. Open a web browser and go to:
```
http://localhost:3000
```

### Usage
#### Login
Upon accessing the application, the user will be prompted to Join page. They can do so by generating new editoId by click on new edito and enter their username and finally clicking on the "Join" button.

#### Code Editor
After logging in, the user will be taken to the code editor page. Here, they can see three windows for HTML, CSS, and JavaScript. They can write, edit and preview their code all in one place.

#### Layout Options
The user can switch between different layout options for their coding environment. They can do so by clicking on the "Layout" button in the top right corner of the screen. The available layout options are:

- Default (HTML, CSS, and JavaScript windows stacked on top of each other)
- Side by Side (HTML, CSS, and JavaScript windows displayed side by side)
- Fullscreen (HTML, CSS, and JavaScript windows displayed fullscreen)
- 
#### Real-Time Communication
All of the features mentioned above are enabled through the use of WebSockets, which allow for real-time communication between the client and server. This means that any changes made to the code will be immediately reflected in the preview window.



