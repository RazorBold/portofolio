from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JSON_SORT_KEYS'] = False

# Store messages (in production, use a database)
MESSAGES_FILE = 'messages.json'

def load_messages():
    """Load messages from JSON file"""
    if os.path.exists(MESSAGES_FILE):
        try:
            with open(MESSAGES_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_messages(messages):
    """Save messages to JSON file"""
    with open(MESSAGES_FILE, 'w') as f:
        json.dump(messages, f, indent=4)

# ==================== Routes ====================

@app.route('/')
def index():
    """Serve main portfolio page"""
    return render_template('index.html')

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = [
        {
            'id': 1,
            'title': 'Smart Water Meter',
            'description': 'Digital meter reading system dengan IoT integration untuk monitoring konsumsi air real-time.',
            'technologies': ['IoT', 'Arduino', 'Node.js'],
            'icon': 'droplet',
            'impact': 'Mengurangi water loss hingga 30%'
        },
        {
            'id': 2,
            'title': 'Smart Flood Detection',
            'description': 'Sistem deteksi banjir berbasis IoT dengan sensor array untuk early warning system.',
            'technologies': ['IoT Sensors', 'Machine Learning', 'API Integration'],
            'icon': 'water',
            'impact': 'Early warning 2-3 jam sebelum banjir'
        },
        {
            'id': 3,
            'title': 'Smart Power Monitoring',
            'description': 'Platform monitoring listrik untuk industri dan residential dengan real-time tracking.',
            'technologies': ['Smart Meter', 'Analytics', 'Python'],
            'icon': 'bolt',
            'impact': 'Penghematan energi hingga 25%'
        },
        {
            'id': 4,
            'title': 'Smart Tracking System',
            'description': 'GPS-based tracking solution untuk fleet management dan asset tracking.',
            'technologies': ['GPS', 'Real-time', 'Cloud'],
            'icon': 'location-dot',
            'impact': 'Efisiensi rute berkendaan meningkat 40%'
        },
        {
            'id': 5,
            'title': 'Smart Dashcam AI',
            'description': 'AI-powered dashcam dengan real-time object detection dan accident prevention.',
            'technologies': ['Deep Learning', 'Computer Vision', 'Edge AI'],
            'icon': 'video',
            'impact': 'Mengurangi accident rate hingga 60%'
        },
        {
            'id': 6,
            'title': 'Smart AI CCTV',
            'description': 'CCTV system dengan AI untuk deteksi sampah dan pengelolaan kebersihan kota.',
            'technologies': ['YOLO', 'Computer Vision', 'IoT'],
            'icon': 'camera',
            'impact': 'Deteksi sampah dengan akurasi 95%'
        }
    ]
    return jsonify(projects)

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get all skills"""
    skills = {
        'IoT Hardware': [
            {'name': 'Arduino & Microcontrollers', 'level': 95},
            {'name': 'Sensor Integration', 'level': 90},
            {'name': 'PCB Design & Manufacturing', 'level': 85},
            {'name': 'Wireless Communication', 'level': 88}
        ],
        'AI & Machine Learning': [
            {'name': 'Deep Learning & Neural Networks', 'level': 92},
            {'name': 'Computer Vision', 'level': 90},
            {'name': 'Time Series Analysis', 'level': 87},
            {'name': 'Model Deployment & Optimization', 'level': 88}
        ],
        'Software Development': [
            {'name': 'Python', 'level': 95},
            {'name': 'C/C++ & Embedded C', 'level': 92},
            {'name': 'JavaScript & Node.js', 'level': 88},
            {'name': 'Full Stack Development', 'level': 90}
        ],
        'Cloud & DevOps': [
            {'name': 'AWS & Azure', 'level': 85},
            {'name': 'Docker & Kubernetes', 'level': 87},
            {'name': 'API Design & REST', 'level': 93},
            {'name': 'Database Management', 'level': 90}
        ]
    }
    return jsonify(skills)

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """Get work experience"""
    experience = [
        {
            'position': 'Senior Engineer / Solution Architecture',
            'company': 'Telkom Indonesia',
            'duration': '2020 - Present',
            'description': 'Leading IoT and AI solutions development, managing multiple projects and teams.',
            'achievements': [
                'Developed 50+ IoT solutions for smart city initiatives',
                'Implemented AI CCTV system for waste management',
                'Led team of 15 engineers',
                'Mentored 30+ campus projects'
            ]
        },
        {
            'position': 'IoT Hardware Engineer',
            'company': 'Telkom Indonesia',
            'duration': '2018 - 2020',
            'description': 'Designed and developed IoT hardware solutions for various applications.',
            'achievements': [
                'Created smart water meter system',
                'Developed flood detection sensor array',
                'Filed 5 patents for IoT innovations'
            ]
        }
    ]
    return jsonify(experience)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        # Validation
        if not all(k in data for k in ('name', 'email', 'message')):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create message object
        message = {
            'id': len(load_messages()) + 1,
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'timestamp': datetime.now().isoformat(),
            'read': False
        }
        
        # Save message
        messages = load_messages()
        messages.append(message)
        save_messages(messages)
        
        # In production, send email notification here
        print(f"New message from {message['name']} ({message['email']})")
        print(f"Message: {message['message']}")
        
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully!',
            'id': message['id']
        }), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Get all messages (admin only in production)"""
    messages = load_messages()
    return jsonify(messages)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get portfolio statistics"""
    messages = load_messages()
    stats = {
        'projects_completed': 50,
        'years_experience': 15,
        'happy_clients': 30,
        'messages_received': len(messages),
        'team_members': 15
    }
    return jsonify(stats)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
