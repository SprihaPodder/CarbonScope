class Gamification:
    def __init__(self):
        self.score = 0.0  # emission score (e.g., grams CO2)
        self.level = "Beginner"

    def update_level(self):
        # Example thresholds - adjust as needed
        if self.score < 200:
            self.level = "Expert"
        elif self.score < 500:
            self.level = "Intermediate"
        else:
            self.level = "Beginner"

    def get_current_score(self):
        return self.score

    def get_user_level(self):
        self.update_level()
        return self.level

    def add_points(self, points, description=None):
        self.score += points
        self.update_level()
        # here points can reflect increased emissions or reduced emissions (negative points)

    def deduct_points(self, points, description=None):
        self.score -= points
        if self.score < 0:
            self.score = 0
        self.update_level()


