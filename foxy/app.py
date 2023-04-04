import flask

app = flask.Flask(__name__)

BRICK_CATEGORIES = [
    {
        'name': 'Functions',
        'color': 'blue',
        'bricks': ['Ask for <query>', 'Respond with <response>']
    },
    {
        'name': 'Controls',
        'color': 'yellow',
        'bricks': ['If <condition>', 'Else', 'End If', 'While <condition>', 'End While', 'Repeat <times>', 'End Repeat']
    },
    {
        'name': 'Data',
        'color': 'orange',
        'bricks': ['Run JavaScript <code>', 'Run Python <code>']
    },
    {
        'name': 'Tools',
        'color': 'purple',
        'bricks': ['Set engine to <engine>']
    }
]

for category in BRICK_CATEGORIES:
    category['bricks_html'] = []

    for brick in category['bricks']:
        category['bricks_html'].append(
            brick\
                .replace('<', '<input type="text" placeholder="')\
                .replace('>', '">')
        )

@app.route('/')
def index():
    """Return the home page."""
    return flask.render_template('index.html', brick_categories=BRICK_CATEGORIES)

app.run(port=2050, debug=True)
