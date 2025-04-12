# Operating System Concepts Project

A modern web application that demonstrates key operating system concepts, focusing on the Banker's Algorithm for deadlock avoidance. Built with Next.js and Tailwind CSS, this project provides an interactive learning experience for understanding operating system principles.

## Features

- **Modern UI**: Built with Next.js and Tailwind CSS for a responsive and beautiful interface
- **Interactive Components**: Smooth animations and transitions using Framer Motion
- **Code Highlighting**: Syntax highlighting for better code readability
- **Responsive Design**: Works seamlessly on all device sizes
- **Dynamic Team Section**: Randomly generated avatars for team members
- **Optimized Performance**: Next.js Image optimization and efficient code splitting

## Tech Stack

- **Frontend**: Next.js 15, React
- **Backend**: Python, FastAPI
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Code Highlighting**: react-syntax-highlighter
- **Image Optimization**: Next.js Image component
- **Avatar Generation**: UI Avatars API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- Python 3.8 or later
- npm or yarn
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vihananand/os-project.git
cd os-project
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
os-project/
├── app/
│   ├── algorithm/         # Algorithm implementations
│   ├── team/             # Team members section
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
├── components/           # Reusable components
├── public/              # Static assets
├── python/             # Python backend code
│   ├── main.py         # FastAPI application
│   ├── algorithms/     # Algorithm implementations
│   └── utils/         # Utility functions
└── tailwind.config.js  # Tailwind configuration
```

## Python Implementation

The project includes a Python backend built with FastAPI that provides algorithm implementations and computational services.

### Key Components

1. **FastAPI Application** (`python/main.py`):
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to OS Concepts API"}
```

2. **Algorithm Implementations** (`python/algorithms/`):
```python
# Example algorithm implementation
def process_scheduling(processes, quantum):
    """
    Implements Round Robin scheduling algorithm
    
    Args:
        processes: List of processes with arrival and burst times
        quantum: Time quantum for scheduling
        
    Returns:
        Dictionary containing scheduling results
    """
    # Implementation details...
    pass
```

3. **Utility Functions** (`python/utils/`):
```python
def calculate_waiting_time(processes):
    """
    Calculates waiting time for a set of processes
    
    Args:
        processes: List of processes with their execution times
        
    Returns:
        List of waiting times for each process
    """
    # Implementation details...
    pass
```

### Features

- **RESTful API**: Clean and efficient API endpoints
- **CORS Support**: Cross-origin resource sharing enabled
- **Type Hints**: Full Python type hinting for better code quality
- **Documentation**: Comprehensive docstrings and API documentation
- **Error Handling**: Robust error handling and validation

## Team

Our team consists of talented developers working together to create an educational platform for operating system concepts:

- **Vihan Anand**: Frontend Developer specializing in React and Next.js
- **Abhinav Kumar**: Backend Developer with expertise in Python and FastAPI
- **Tanish Sharma**: Full Stack Developer skilled in both frontend and backend technologies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the animation library
- UI Avatars for the avatar generation service
- FastAPI team for the excellent Python web framework
