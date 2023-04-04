"""The main application module."""

import json

import flask

import bricks

app = flask.Flask(__name__)

@app.route('/')
def index():
    """Return the home page."""
    return flask.render_template('index.html', brick_categories=bricks.BRICK_CATEGORIES)

def get_project(request):
    code = request.cookies.get('project')
    if not code:
        code = request.args.get('project')

    return code

@app.route('/api/save', methods=['POST'])
def save():
    """Save the current project."""
    code = get_project(flask.request)
    body = flask.request.get_json()

    with open(f'saves/{code}.json'.format(code), 'w', encoding='utf-8') as save_file:
        json.dump(body, save_file)

    return code

@app.route('/api/load')
def load():
    """Load a project."""
    code = get_project(flask.request)

    try:
        with open(f'saves/{code}.json'.format(code), 'r', encoding='utf-8') as save_file:
            return json.load(save_file)
    except FileNotFoundError:
        return flask.Response(status=404)

app.run(port=2050, debug=True)
