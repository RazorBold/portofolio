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
            'category': 'IoT Device Monitoring',
            'title': 'Smart Water Meter IoT System',
            'description': 'Complete IoT solution untuk monitoring konsumsi air. Mengintegrasikan sensor flow meter, GSM module untuk transmisi data, Python backend dengan TCP socket communication, MySQL database untuk data logging, dan dashboard web real-time. Handling data caching pada device saat signal hilang dengan automatic retry mechanism.',
            'technologies': ['IoT Hardware', 'GSM Module', 'TCP/Socket', 'Python', 'MySQL', 'Real-time Data'],
            'icon': 'droplet',
            'impact': '30% water conservation',
            'keyFeatures': ['Real-time Monitoring', 'SMS Alerts', 'Data Logging', 'TCP Communication', 'Offline Caching']
        },
        {
            'id': 2,
            'category': 'IoT Data Processing',
            'title': 'GPS Tracking Data Processing System',
            'description': 'Advanced GPS tracking system dengan multi-device connection handling (IMEI-based). Backend service menggunakan Python multithreading untuk process data dari ratusan device simultaneously. Implementasi data validation, time series analysis, dan intelligent caching untuk optimize data transmission pada jaringan GSM 2G/3G yang unstable.',
            'technologies': ['GPS Tracking', 'Python', 'Multithreading', 'TCP Communication', 'Data Pipeline', 'Linux'],
            'icon': 'location-dot',
            'impact': '40% route efficiency improvement',
            'keyFeatures': ['Multi-device Handling', 'Real-time Tracking', 'Data Optimization', 'Connection Management']
        },
        {
            'id': 3,
            'category': 'Smart Poultry IoT',
            'title': 'Smart Poultry Monitoring IoT Platform',
            'description': 'End-to-end IoT solution untuk farm monitoring mencakup temperature/humidity sensors, automated alert system berbasis rules, data visualization untuk performance analysis. Menghandle edge case seperti sensor malfunction detection, data gap handling, dan predictive maintenance alerts menggunakan historical data analysis.',
            'technologies': ['IoT Sensors', 'Data Processing', 'Telemetry', 'Python', 'Real-time Monitoring'],
            'icon': 'temperature-high',
            'impact': '50% operational efficiency',
            'keyFeatures': ['Real-time Alerts', 'Predictive Analysis', 'Sensor Diagnostics', 'Data Validation']
        },
        {
            'id': 4,
            'category': 'TCP Communication',
            'title': 'TCP Device Communication Server',
            'description': 'Robust TCP socket server backend untuk handle komunikasi dengan ratusan IoT devices. Implementasi connection pooling, packet decoding, binary data parsing, dan protocol analysis. Sophisticated troubleshooting untuk TCP spike incidents, memory leak detection, dan data loss investigation dengan detailed logging system.',
            'technologies': ['TCP/Socket Programming', 'Python', 'Multithreading', 'Protocol Analysis', 'Packet Decoding'],
            'icon': 'server',
            'impact': 'Support 1000+ concurrent connections',
            'keyFeatures': ['Connection Pooling', 'Protocol Debugging', 'Memory Optimization', 'Performance Monitoring']
        },
        {
            'id': 5,
            'category': 'Data Engineering',
            'title': 'IoT Data Logging & Analytics System',
            'description': 'Comprehensive data logging architecture untuk sensor data processing dan storage. Implementasi data cleaning, validation, time series handling dengan MySQL/PostgreSQL. Advanced troubleshooting untuk data delay analysis, connection timing analysis, dan missing data detection dengan root cause analysis.',
            'technologies': ['Data Engineering', 'MySQL', 'PostgreSQL', 'Python', 'Time Series', 'Data Pipeline'],
            'icon': 'database',
            'impact': 'Process 100K+ data points daily',
            'keyFeatures': ['Real-time Processing', 'Data Validation', 'Historical Analysis', 'Reporting Architecture']
        },
        {
            'id': 6,
            'category': 'Dashboard & Tools',
            'title': 'IoT Dashboard & Support Tools',
            'description': 'Custom tools dan dashboard untuk IoT system operation. Termasuk fleet monitoring dashboard, real-time device status tracking, automated report generation. Backend tools untuk troubleshooting, device diagnostics, data export, dan performance analysis dengan detailed visualization.',
            'technologies': ['Python', 'REST API', 'Data Visualization', 'Web Dashboard', 'Reporting'],
            'icon': 'chart-line',
            'impact': 'Reduce troubleshooting time by 70%',
            'keyFeatures': ['Real-time Monitoring', 'Automated Reports', 'Device Diagnostics', 'Data Export']
        },
        {
            'id': 7,
            'category': 'Mobile IoT Apps',
            'title': 'IoT Mobile Application (Flutter)',
            'description': 'Mobile app untuk IoT device monitoring dan control menggunakan Flutter dengan native Dart backend. Seamless integration dengan TCP socket server, real-time data updates via WebSocket, offline functionality dengan local SQLite caching. Support untuk multiple device types dengan adaptive responsive UI.',
            'technologies': ['Flutter', 'Dart', 'WebSocket', 'SQLite', 'REST API', 'Real-time Data'],
            'icon': 'mobile',
            'impact': '95% user adoption rate',
            'keyFeatures': ['Real-time Updates', 'Offline Mode', 'Multi-device Support', 'Responsive Design']
        },
        {
            'id': 8,
            'category': 'Thesis & Mentoring',
            'title': 'Campus IoT Projects & Thesis Mentoring',
            'description': 'Technical mentoring dan development guidance untuk 30+ student thesis projects spanning IoT, AI, dan embedded systems. Covering full IoT stack dari device prototyping, backend development, system architecture, hingga production deployment. Demonstrating best practices dalam technical problem solving, system design, dan operational excellence.',
            'technologies': ['IoT Architecture', 'System Design', 'Python', 'Embedded Systems', 'Best Practices'],
            'icon': 'graduation-cap',
            'impact': '30+ successful projects completed',
            'keyFeatures': ['System Architecture', 'Best Practices', 'Problem Solving', 'Production Ready']
        }
    ]
    return jsonify(projects)

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get all skills"""
    skills = {
        'IoT System Engineering': [
            {'name': 'IoT Solution Design & Architecture', 'level': 95},
            {'name': 'Device Integration & Configuration', 'level': 94},
            {'name': 'Sensor Data Processing', 'level': 93},
            {'name': 'IoT Troubleshooting & Diagnostics', 'level': 92},
            {'name': 'Edge Device Behavior Analysis', 'level': 91}
        ],
        'Network & Communication': [
            {'name': 'TCP Socket Programming', 'level': 95},
            {'name': 'GSM Communication Devices', 'level': 92},
            {'name': 'Protocol Analysis & Debugging', 'level': 90},
            {'name': 'Data Transmission Optimization', 'level': 89},
            {'name': 'Network Architecture Design', 'level': 88}
        ],
        'Backend Development': [
            {'name': 'Python Backend Development', 'level': 96},
            {'name': 'Multithreading Programming', 'level': 93},
            {'name': 'REST API Integration', 'level': 92},
            {'name': 'Background Service Development', 'level': 91},
            {'name': 'Logging System Design', 'level': 90}
        ],
        'Data Engineering & Processing': [
            {'name': 'Sensor Data Processing', 'level': 94},
            {'name': 'Time Series Data Handling', 'level': 91},
            {'name': 'Data Validation & Cleaning', 'level': 90},
            {'name': 'Real-time Data Pipeline', 'level': 89},
            {'name': 'Database Integration', 'level': 88}
        ],
        'Systems & DevOps': [
            {'name': 'Linux Server Management', 'level': 92},
            {'name': 'Process Monitoring (PM2)', 'level': 91},
            {'name': 'Log Analysis & Debugging', 'level': 90},
            {'name': 'VM Deployment & Configuration', 'level': 89},
            {'name': 'System Architecture Design', 'level': 88}
        ],
        'Mobile Development': [
            {'name': 'Flutter (IoT Mobile Apps)', 'level': 87},
            {'name': 'Dart Programming', 'level': 86},
            {'name': 'IoT App Architecture', 'level': 85}
        ]
    }
    return jsonify(skills)

@app.route('/api/tech-stack', methods=['GET'])
def get_tech_stack():
    """Get technology stack"""
    tech_stack = {
        'Languages': ['Python', 'Dart (Flutter)', 'SQL', 'JSON', 'Bash'],
        'IoT & Networking': ['TCP/Socket Programming', 'GSM Communication', 'IMEI-based Connection', 'Telemetry', 'Antares IoT Platform'],
        'Backend & Frameworks': ['Python multithreading', 'REST API', 'Flask', 'Socket Server'],
        'Databases': ['MySQL', 'PostgreSQL', 'JSON Storage'],
        'Tools & Platforms': ['PM2', 'Linux/Ubuntu', 'Git', 'Docker (basic)'],
        'Concepts': ['IoT Architecture', 'Data Pipeline', 'Device Communication', 'Real-time Processing', 'System Design']
    }
    return jsonify(tech_stack)

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """Get work experience"""
    experience = [
        {
            'position': 'Senior IoT Engineer / Technical Lead',
            'company': 'IoT Solutions Provider',
            'duration': '2020 - Present',
            'duration_years': '4+ years',
            'description': 'Spesialis dalam merancang, mengimplementasikan, dan mengelola end-to-end IoT solutions. Menangani architecture design, TCP socket server development, device communication, data processing pipeline, dan production deployment untuk sistem-sistem kritis.',
            'responsibilities': [
                'Design end-to-end IoT system architecture untuk berbagai use cases (device monitoring, GPS tracking, data logging)',
                'Develop robust TCP socket servers untuk handle 1000+ concurrent device connections dengan multi-threading',
                'Implement GSM/2G/3G communication optimization dan troubleshooting untuk transmission data yang reliable',
                'Lead data engineering pipelines untuk process 100K+ data points daily dengan real-time analysis',
                'Mentor junior engineers dan membimbing 30+ campus projects untuk thesis development',
                'Root cause analysis dan sophisticated troubleshooting untuk production incidents',
                'System reliability optimization dengan 99.5%+ uptime target'
            ],
            'achievements': [
                '50+ production IoT systems deployed dengan sukses',
                'GPS tracking system untuk 500+ vehicles dengan real-time monitoring',
                'Smart water meter system mengurangi water loss hingga 30%',
                'Flood detection platform dengan early warning 2-3 jam sebelum banjir',
                'Data processing architecture handle 1000+ concurrent device connections',
                '30+ thesis projects mentoring dengan 100% completion rate',
                'TCP communication server optimization meningkatkan performance 60%'
            ]
        },
        {
            'position': 'IoT System Engineer',
            'company': 'Telcom/IoT Development Team',
            'duration': '2018 - 2020',
            'duration_years': '2+ years',
            'description': 'Fokus pada device integration, backend service development, Python socket programming, dan operational deployment untuk IoT projects.',
            'responsibilities': [
                'Hardware integration dan IoT device configuration (sensors, GSM modules, microcontrollers)',
                'Python backend development untuk sensor data processing dan TCP communication',
                'Design data caching mechanism pada edge devices untuk handle network instability',
                'MySQL/PostgreSQL database integration untuk data logging dan historical analysis',
                'Linux server management dan service deployment menggunakan PM2',
                'API development dan REST endpoint design untuk frontend integration',
                'Network protocol analysis dan packet-level debugging untuk communication issues'
            ],
            'achievements': [
                'Smart water meter system development (device integration, TCP, MySQL, dashboard)',
                'Flood detection sensor array dengan real-time alert system',
                'GPS tracking architecture untuk multi-device handling dengan IMEI-based connection',
                'Data validation dan cleaning pipeline untuk time series data quality',
                'Field troubleshooting dan technical support untuk operational systems'
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
