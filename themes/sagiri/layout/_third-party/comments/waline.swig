{% if theme.waline.enable and theme.waline.serverURL %}
    <script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v2/dist/waline.css"/>
    <script>
        Waline.init({
            el: '#waline',
            serverURL: '{{ theme.waline.serverURL }}',
            emoji: [
                '//unpkg.com/@waline/emojis@1.0.1/qq',
                '//unpkg.com/@waline/emojis@1.0.1/weibo',
                '//unpkg.com/@waline/emojis@1.0.1/bilibili',
            ],
        });
    </script>
    <style>
        /*设置 Waline 的主题色*/
        :root{
            --waline-bgcolor: #fff0;
            --waline-bgcolor-light: #fff0;
        }
        .wl-emoji-popup .wl-tab-wrapper {
            background: #FFF;
            max-height: 125px;
        }
    </style>
{% endif %}
