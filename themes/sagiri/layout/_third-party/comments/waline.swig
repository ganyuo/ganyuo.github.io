{% if theme.waline.enable and theme.waline.serverURL %}
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <script  type="module">
        import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

        const waline = init({
            el: '#waline',
            serverURL: '{{ theme.waline.serverURL }}',
            emoji: [
                '//unpkg.com/@waline/emojis@1.2.0/qq',
                '//unpkg.com/@waline/emojis@1.2.0/bmoji',
                '//unpkg.com/@waline/emojis@1.2.0/bilibili',
            ],
        });
    </script>
    <style>
        /*设置 Waline 的主题色*/
        :root{
            --waline-bg-color: #fff0;
            --waline-bg-color-light: #fff0;
        }
        #waline {
            padding: 2em;
        }
    </style>
{% endif %}
