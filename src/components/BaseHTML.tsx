import * as elements from "typed-html"

export const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html class="h-full" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/htmx.org@1.9.6" integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>

    <script>
        let command = '/size/'
        command += window.innerWidth
        command += '/'
        command += window.innerHeight

        fetch(command).then(() => {})
    </script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    gridTemplateColumns: {
                        '13': 'repeat(12, minmax(0, 1fr))',
                        '14': 'repeat(14, minmax(0, 1fr))',
                        '15': 'repeat(15, minmax(0, 1fr))',
                        '16': 'repeat(16, minmax(0, 1fr))',
                        '17': 'repeat(17, minmax(0, 1fr))',
                        '18': 'repeat(18, minmax(0, 1fr))',
                        '19': 'repeat(19, minmax(0, 1fr))',
                        '20': 'repeat(20, minmax(0, 1fr))',
                        '21': 'repeat(21, minmax(0, 1fr))',
                        '22': 'repeat(22, minmax(0, 1fr))',
                        '23': 'repeat(23, minmax(0, 1fr))',
                        '24': 'repeat(24, minmax(0, 1fr))',
                        '25': 'repeat(25, minmax(0, 1fr))',
                        '26': 'repeat(26, minmax(0, 1fr))',
                        '27': 'repeat(27, minmax(0, 1fr))',
                        '28': 'repeat(28, minmax(0, 1fr))',
                        '29': 'repeat(29, minmax(0, 1fr))',
                        '30': 'repeat(30, minmax(0, 1fr))',
                        '31': 'repeat(31, minmax(0, 1fr))',
                        '32': 'repeat(32, minmax(0, 1fr))',
                        '33': 'repeat(33, minmax(0, 1fr))',
                        '34': 'repeat(34, minmax(0, 1fr))',
                        '35': 'repeat(35, minmax(0, 1fr))',
                        '36': 'repeat(36, minmax(0, 1fr))',
                        '37': 'repeat(37, minmax(0, 1fr))',
                    }
                }
            }
        }

    </script>
</head>

${children}
</html>
`