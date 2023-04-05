"""The main application module."""

import json

import flask

import bricks

app = flask.Flask(__name__)

@app.route('/')
def index():
    """Return the home page."""
    return flask.render_template('index.html', brick_categories=bricks.BRICK_CATEGORIES)

@app.route('/api/save/<code>', methods=['POST'])
def save(code):
    """Save the current project."""
    body = flask.request.get_json()

    with open(f'saves/{code}.json'.format(code), 'w', encoding='utf-8') as save_file:
        json.dump(body, save_file)

    return flask.Response(status=200)

@app.route('/api/load/<code>')
def load(code):
    """Load a project."""
    try:
        with open(f'saves/{code}.json'.format(code), 'r', encoding='utf-8') as save_file:
            return json.load(save_file)
    except FileNotFoundError:
        return flask.Response(status=404)

app.run(port=2050, debug=True)
