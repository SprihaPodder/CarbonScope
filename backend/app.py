from flask import Flask, jsonify, request
from flask_cors import CORS
from google.gmail import get_email_count
from google.drive import get_drive_storage
from google.youtube import get_video_hours
import datetime
import random

# Import or define your Gamification class here
from gamification import Gamification

app = Flask(__name__)
CORS(app)

# Existing endpoints...

@app.route('/api/category/pie', methods=['GET'])
def get_category_data():
    data = [
        {'name': 'Email', 'value': get_email_count()},
        {'name': 'Online Storage', 'value': get_drive_storage()},
        {'name': 'Video Streaming', 'value': get_video_hours()},
    ]
    return jsonify(data)

@app.route('/api/weekly/total', methods=['GET'])
def get_weekly_totals():
    email_val = get_email_count()
    storage_val = get_drive_storage()
    video_val = get_video_hours()
    today = datetime.date.today()
    weekly_data = []
    for i in range(7):
        day_date = today - datetime.timedelta(days=6 - i)
        day_label = day_date.strftime('%a')
        daily_email = max(0, int(email_val * random.uniform(0.85, 1.15)))
        daily_storage = max(0, int(storage_val * random.uniform(0.85, 1.15)))
        daily_video = max(0, int(video_val * random.uniform(0.85, 1.15)))
        total = daily_email + daily_storage + daily_video
        weekly_data.append({
            "day": day_label,
            "value": total
        })
    return jsonify(weekly_data)

# --- ADD THIS: Daily Breakdown endpoint ---
@app.route('/api/daily_breakdown', methods=['GET'])
def get_daily_breakdown():
    email_count = get_email_count()
    storage_gb = get_drive_storage()
    browsing_hours = get_video_hours()   # Adjust this if you have real browsing data; otherwise, use video as proxy or set static/random value
    return jsonify({
        "emails_sent": email_count,
        "browsing_hours": round(browsing_hours, 1),
        "cloud_storage": round(storage_gb, 1)
    })

# --- ADD THIS: Today's total CO₂ endpoint ---
@app.route('/api/total_co2', methods=['GET'])
def get_total_co2():
    # For today's total: sum up from the same sources as breakdown
    email_count = get_email_count()
    storage_gb = get_drive_storage()
    video_hours = get_video_hours()
    # For now, just sum as in your mock UI.
    total = email_count + storage_gb + video_hours
    return jsonify({ "total": round(total) })  # gCO2 mock for now

# Existing gamification endpoints unchanged...

gamification_instance = Gamification()


@app.route("/api/gamification", methods=["GET"])
def get_gamification_status():
    return jsonify({
        "score": gamification_instance.get_current_score(),
        "level": gamification_instance.get_user_level()
    })

@app.route("/api/gamification/update", methods=["POST"])
def update_gamification():
    data = request.get_json()
    action_type = data.get("type")
    points = data.get("points")
    description = data.get("description")

    if action_type == "add":
        gamification_instance.add_points(points, description)
    elif action_type == "deduct":
        gamification_instance.deduct_points(points, description)
    else:
        return jsonify({"error": "Invalid action type"}), 400

    return jsonify({
        "success": True,
        "new_score": gamification_instance.get_current_score(),
        "new_level": gamification_instance.get_user_level()
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)






# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from google.gmail import get_email_count
# from google.drive import get_drive_storage
# from google.youtube import get_video_hours
# import datetime
# import random

# # Import or define your Gamification class here
# from gamification import Gamification

# app = Flask(__name__)
# CORS(app)

# # Your existing category pie and weekly total endpoints
# @app.route('/api/category/pie', methods=['GET'])
# def get_category_data():
#     data = [
#         {'name': 'Email', 'value': get_email_count()},
#         {'name': 'Online Storage', 'value': get_drive_storage()},
#         {'name': 'Video Streaming', 'value': get_video_hours()},
#     ]
#     return jsonify(data)

# @app.route('/api/weekly/total', methods=['GET'])
# def get_weekly_totals():
#     email_val = get_email_count()
#     storage_val = get_drive_storage()
#     video_val = get_video_hours()

#     today = datetime.date.today()

#     weekly_data = []
#     for i in range(7):
#         day_date = today - datetime.timedelta(days=6 - i)
#         day_label = day_date.strftime('%a')

#         daily_email = max(0, int(email_val * random.uniform(0.85, 1.15)))
#         daily_storage = max(0, int(storage_val * random.uniform(0.85, 1.15)))
#         daily_video = max(0, int(video_val * random.uniform(0.85, 1.15)))

#         total = daily_email + daily_storage + daily_video

#         weekly_data.append({
#             "day": day_label,
#             "value": total
#         })

#     return jsonify(weekly_data)


# # ----- New gamification endpoints -----

# gamification_instance = Gamification()

# emissions_store = {}

# def seed_last_7_days():
#     samples = [420, 380, 610, 300, 720, 550, 480]
#     today = datetime.date.today()
#     for i, val in enumerate(samples[::-1]):
#         d = today - datetime.timedelta(days=6 - i)
#         emissions_store[d.isoformat()] = val

# seed_last_7_days()

# @app.route("/api/gamification", methods=["GET"])
# def get_gamification_status():
#     return jsonify({
#         "score": gamification_instance.get_current_score(),
#         "level": gamification_instance.get_user_level()
#     })

# @app.route("/api/gamification/update", methods=["POST"])
# def update_gamification():
#     data = request.get_json()
#     action_type = data.get("type")
#     points = data.get("points")
#     description = data.get("description")

#     if action_type == "add":
#         gamification_instance.add_points(points, description)
#     elif action_type == "deduct":
#         gamification_instance.deduct_points(points, description)
#     else:
#         return jsonify({"error": "Invalid action type"}), 400

#     return jsonify({
#         "success": True,
#         "new_score": gamification_instance.get_current_score(),
#         "new_level": gamification_instance.get_user_level()
#     })

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)



