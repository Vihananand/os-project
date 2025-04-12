# Operating System Concepts Project

A modern web application that demonstrates key operating system concepts, focusing on the Banker's Algorithm for deadlock avoidance.

## Features

- **Banker's Algorithm Implementation**: A clean, well-documented implementation of the Banker's Algorithm for deadlock avoidance
- **Modern UI**: Built with Next.js and Tailwind CSS for a responsive and beautiful interface
- **Interactive Components**: Smooth animations and transitions using Framer Motion
- **Code Highlighting**: Syntax highlighting for better code readability
- **Responsive Design**: Works seamlessly on all device sizes

## Tech Stack

- **Frontend**: Next.js 15, React
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Code Highlighting**: react-syntax-highlighter

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vihananand/os-project.git

cd os-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
os-project/
├── app/
│   ├── algorithm/         # Banker's Algorithm
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── public/                # Static assets
└── tailwind.config.js     # Tailwind configuration
```

## Banker's Algorithm

The Banker's Algorithm is a resource allocation and deadlock avoidance algorithm that tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources.

### Code

```javascript
// Availiable on the website in the Implementation section
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the animation library
