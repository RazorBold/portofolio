#!/bin/bash

echo "🚀 Starting Muhammad Syaiful Romadlon Portfolio Setup..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Show success message
echo ""
echo "✨ Setup complete!"
echo ""
echo "🎉 To start the server, run:"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "📱 Then open your browser and navigate to: http://localhost:5000"
echo ""
