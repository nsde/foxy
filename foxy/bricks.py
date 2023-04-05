BRICK_CATEGORIES = [
    {
        'name': 'Functions',
        'color': 'blue',
        'bricks': ['Complete with GPT-3 and save response to <var>']
    },
    {
        'name': 'Controls',
        'color': 'yellow',
        'bricks': ['Show value of <var>', 'Set <var> to <value>']
    },
    {
        'name': 'Data',
        'color': 'orange',
        'bricks': ['Run JavaScript <code>', 'Run Python <code>']
    },
    {
        'name': 'FoxGPT',
        'color': 'purple',
        'bricks': ['Set engine to <engine>', 'Set prompt to <prompt>']
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
