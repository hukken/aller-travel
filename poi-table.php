<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>POI-table</title>
        <link rel="stylesheet" media="all" href="css/style.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.7/xlsx.core.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
        <script src="//cdn.jsdelivr.net/alasql/0.2/alasql.min.js"></script>
        <script src="scripts/scripts.js"></script>
        <style>
            .the-code pre {
                height:60vh;
                width: 60vw;
                display: block;
                padding: .75em;
                word-break: break-all;
                word-wrap: break-word;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 4px;
                color: #5a5a5a;
                margin-bottom: 1.5em;
                line-height: 1em;
                white-space: pre;
                overflow-x: auto;
                box-sizing: border-box;
            }
            .the-code .poi-view-code {
                width: 60vw;
                height:auto;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Tabell-generator: POI<h1>
        <h2>Last opp Excel-fil:</h2>
        <input id="files" type="file" />
        <div class="the-code" style="display: none;">
            <h2>HTML-kode:</h2>
            <pre id="inject-poi-here">
            </pre>
            <button id="copy-poi-code" data-clipboard-target="#inject-poi-here">Kopier HTML</button>
            <button id="preview-poi-code">Forhåndsvis graf</button>
            <div class="poi-view-code" style="display: none;"></div>
        </div>
        <script src="scripts/generatorScript.js"></script>
    </body>
</html>