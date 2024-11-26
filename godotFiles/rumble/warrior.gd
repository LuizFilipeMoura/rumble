extends CharacterBody2D


var speed = 1000


# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
var target = Vector2(0, 0)

func _physics_process(delta):

	velocity = (target - position).normalized() * speed
	if (target - position).length() > 5:
		move_and_slide()
	else:
		position = target

func _ready():
	target = Vector2(position.x, position.y)
	var bar = get_node("HealthBar")
	print(bar.tint_progress)
	
func goToPosition(x, y, _speed):
	target = Vector2(x, y)
	speed = _speed * 10
