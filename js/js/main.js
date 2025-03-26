// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector('#lg-sw-logo');
    if (!icon) {
        console.error('Elemento #lg-sw-logo não encontrado!');
        return;
    }

    // Array de imagens
    const images = [
        './img/logo0.svg',
        './img/logo1.svg',
        './img/logo2.svg',
        './img/logo3.svg'
    ];
    let currentIndex = 0;

    // Animação de flutuação
    let time = 0;
    const amplitude = 2;
    const speed = 0.03;

    function floatAnimation() {
        time += speed;
        const offset = Math.sin(time) * amplitude;
        icon.style.transform = `translateY(${offset}px)`;
        requestAnimationFrame(floatAnimation);
    }

    // Função para trocar a imagem
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length; // Alterna entre os índices (0, 1, 2)
        icon.src = images[currentIndex]; // Atualiza a fonte da imagem
    }

    // Inicia a animação de flutuação
    if (icon) {
        floatAnimation();
    }

    // Inicia a troca de imagem a cada 5 segundos
    setInterval(changeImage, 5000); // 5000 ms = 5 segundos
});




// ANIMAÇÃO DIV WRAPPER-SOCIAL
// Seleciona os elementos pelos IDs específicos
const socialIcons = [
    document.getElementById('id-lkdn'), // LinkedIn
    document.getElementById('id-Gthb'), // GitHub
    document.getElementById('id-Xai'),  // X
    document.getElementById('id-Dscd')  // Discord
];

// Função para criar animação de flutuação com direção alternada
function floatElement(element, index) {
    let position = 0;
    const speed = 0.02 + Math.random() * 0.005; // Velocidade aumentada e com variação aleatória
    const amplitude = 5; // Amplitude aumentada para 5px
    const offset = Math.random() * 2 * Math.PI; // Offset inicial aleatório para dessincronizar

    // Define a direção: ícones com índice par (0, 2) vão para a esquerda, ímpar (1, 3) para a direita
    const direction = index % 2 === 0 ? -1 : 1;

    function animate() {
        // Usa Math.sin com offset para movimento suave
        position += speed;
        const translation = Math.sin(position + offset) * amplitude * direction;

        // Aplica a transformação no eixo X
        element.style.transform = `translateX(${translation}px)`;

        // Continua a animação
        requestAnimationFrame(animate);
    }

    // Inicia a animação
    animate();
}

// Aplica a animação a cada ícone
socialIcons.forEach((icon, index) => {
    if (icon) { // Verifica se o elemento existe
        setTimeout(() => floatElement(icon, index), index * 300); // Delay inicial para dessincronizar
    } else {
        console.log(`Elemento com índice ${index} não encontrado. Verifique o ID.`);
    }
});

// Debug: Verifica se os elementos foram encontrados
console.log("Elementos encontrados:", socialIcons);


// CLONE CARDS // 
// Espera o DOM carregar completamente
/* document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o contêiner dos cards e o primeiro card como template
    const wrapperCards = document.querySelector('.wrapper__cards');
    const templateCard = document.querySelector('.proj-card');

    if (!wrapperCards || !templateCard) {
        console.error('Contêiner .wrapper__cards ou template .proj-card não encontrado!');
        return;
    }

    // Array com dados dos cards, agora incluindo os links
    const cardData = [
        {
            image: {
                src: './img/image-project-portifolio.webp',
                alt: 'image-portifolio'
            },
            title: 'HTML, SASS e Javascript',
            description: {
                title: 'Portifólio',
                text: 'Meu portifólio_Fernando Moreira',
                buttonText: 'Ver o projeto',
                link: 'https://feryamaha.github.io/FM-FRONT-END---PORTIFOLIO-main/'
            }
        },
        {
            image: {
                src: './img/image-project-alpha.webp',
                alt: 'image-alpha'
            },
            title: 'HTML, SASS e Javascript',
            description: {
                title: 'Alpha',
                text: 'Projeto front-end desenvolvido para a Auclan Design',
                buttonText: 'Ver o projeto',
                link: 'https://feryamaha.github.io/ALPHA-2025/'
            }
        },
        {
            image: {
                src: './img/image-project-mlx.webp',
                alt: 'image-mlx'
            },
            title: 'HTML, SASS e Javascript',
            description: {
                title: 'MLX CAPITAL',
                text: 'Projeto front-end desenvolvido para a Auclan Design',
                buttonText: 'Ver o projeto',
                link: 'https://feryamaha.github.io/MLX-2025/'
            }
        },
        {
            image: {
                src: './img/image-project-autodataF.webp',
                alt: 'image-autodataF'
            },
            title: 'React, Node.js e PostgreSQL',
            description: {
                title: 'AutodataF',
                text: 'Plataforma de cursos Free do Youtube',
                buttonText: 'Ver o projeto',
                link: 'https://autodata-f.vercel.app/'
            }
        }
    ];

    // Injeta CSS dinamicamente para o hover do link Auclan Design
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .auclan-link:hover {
            opacity: 0.7;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // Função para criar e preencher um card clonado
    function createCard(data) {
        // Clona o template
        const newCard = templateCard.cloneNode(true);

        // Seleciona os elementos dentro do card clonado
        const cardImage = newCard.querySelector('.proj-card__image img');
        const cardTitle = newCard.querySelector('.proj-card__title p');
        const descriptionTitle = newCard.querySelector('.proj-card__description .title-project');
        const descriptionText = newCard.querySelector('.proj-card__description p:nth-child(2)');
        const button = newCard.querySelector('.proj-card__description button');

        // Preenche os dados
        cardImage.src = data.image.src;
        cardImage.alt = data.image.alt;
        cardTitle.textContent = data.title;
        descriptionTitle.textContent = data.description.title;

        // Configura o texto com link para "Auclan Design"
        if (data.description.text.includes('Auclan Design')) {
            const link = document.createElement('a');
            link.href = 'https://auclandesign.com/';
            link.textContent = 'Auclan Design';
            link.target = '_blank';
            link.style.textDecoration = 'underline';
            link.style.fontStyle = 'italic';
            link.style.color = '#623AF7';
            link.classList.add('auclan-link');

            const textParts = data.description.text.split('Auclan Design');
            descriptionText.innerHTML = `${textParts[0]}${link.outerHTML}${textParts[1]}`;
        } else {
            descriptionText.textContent = data.description.text;
        }

        // Configura o botão com o link do projeto
        button.textContent = data.description.buttonText;
        button.className = 'btn-grad'; // Corrige a classe (remove o ponto)
        button.addEventListener('click', () => {
            window.open(data.description.link, '_blank'); // Abre o link em nova aba
        });

        return newCard;
    }

    // Configura o botão do card original (template)
    const originalButton = templateCard.querySelector('.proj-card__description button');
    if (originalButton) {
        originalButton.className = 'btn-grad'; // Corrige a classe
        originalButton.addEventListener('click', () => {
            window.open(cardData[3].description.link, '_blank'); // Link do AutodataF (último item)
        });
    }

    // Limpa o contêiner para evitar duplicatas
    wrapperCards.innerHTML = '';

    // Cria um card para cada item no array
    cardData.forEach(data => {
        const newCard = createCard(data);
        wrapperCards.appendChild(newCard);
    });
}); */



//////////////////////////////////////////////////////////////////
// Animação para o link "View all ~~>"
document.addEventListener('DOMContentLoaded', () => {
    const viewAllLinks = document.querySelectorAll('.proj-view-all, .skills-view-all, .about-view-all');

    if (viewAllLinks.length === 0) {
        console.error('Elementos .proj-view-all, .skills-view-all ou .about-view-all não encontrados!');
        return;
    }

    let position = 0;
    const amplitude = 5; // Distância máxima do movimento (em pixels)
    const speed = 0.03; // Velocidade da animação (menor = mais lento)

    function animateViewAllLinks() {
        position += speed;
        const translation = Math.sin(position) * amplitude;
        viewAllLinks.forEach(link => {
            link.style.transform = `translateX(${translation}px)`;
        });
        requestAnimationFrame(animateViewAllLinks);
    }

    // Inicia a animação
    animateViewAllLinks();
});


/////////////////////////////
// Animação de progresso na borda dos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.proj-card');

    cards.forEach(card => {
        let progress = 0;
        const speed = 0.0004; // Velocidade da animação

        function animateBorder() {
            progress = (progress + speed) % 1; // Mantém o loop entre 0 e 1
            const angle = progress * 360; // Converte para graus

            card.style.borderImage = `linear-gradient(
                ${angle}deg,
                #8A6AFF 0%,
                transparent 30%,
                #fff 50%,
                #8A6AFF 100%
            ) 1`;

            requestAnimationFrame(animateBorder);
        }

        requestAnimationFrame(animateBorder);
    });
});

///////////////////////////////////////
// Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('.intro__text');
    const introTitle = document.querySelector('.intro__title');
    const introDescription = document.querySelector('.intro__description');

    // Neutraliza o texto HTML inicial
    introTitle.innerHTML = '';
    introDescription.innerHTML = '';

    // Textos a serem digitados
    const titleText = "Fernando Moreira\nDesenvolvedor\nfront-end";
    const descriptionText = "Dou vida ao seu design.\nPáginas web com precisão em cada elemento.";

    // Criação do elemento para cursor e mensagens
    const cursorContainer = document.createElement('span');
    cursorContainer.className = 'cursor-container';
    introText.appendChild(cursorContainer);

    // Criação do elemento para contagem inicial
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown-container';
    const counterSpan = document.createElement('span');
    counterSpan.className = 'counter';
    countdownContainer.appendChild(counterSpan);
    introText.insertBefore(countdownContainer, introText.firstChild);

    // Injeta a fonte Modern DOS via @font-face (usando .woff2)
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @font-face {
            font-family: 'Modern DOS';
            src: url('./fonts/ModernDOS8X16.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }
        .counter, .backspace-counter {
            font-family: 'Modern DOS', 'Courier New', monospace !important;
            font-size: 32px;
        }
    `;
    document.head.appendChild(styleElement);

    // Estilização inicial via JS
    counterSpan.style.color = '#51d63a'; // Verde para "Starting"

    // Cria o cursor globalmente
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    cursor.style.background = 'linear-gradient(90deg, red, orange)';
    cursor.style.webkitBackgroundClip = 'text';
    cursor.style.backgroundClip = 'text';
    cursor.style.color = 'transparent';
    const blinkInterval = blinkCursor(cursor);

    // Função para piscar o cursor
    function blinkCursor(cursorElement) {
        let isVisible = true;
        return setInterval(() => {
            cursorElement.style.opacity = isVisible ? '1' : '0';
            isVisible = !isVisible;
        }, 1000); // 1000ms (500ms visível, 500ms invisível)
    }

    // Função de contagem regressiva inicial
    function startCountdown(callback) {
        countdownContainer.style.display = 'block';
        let count = 5;
        counterSpan.textContent = `[ Starting ...${count} ]`;

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                counterSpan.textContent = `[ Starting ...${count} ]`;
            } else {
                clearInterval(countdownInterval);
                countdownContainer.style.display = 'none';
                callback();
            }
        }, 1000);
    }

    // Função de contagem com backspace
    function startBackspaceCountdown(callback) {
        cursorContainer.style.display = 'inline';
        cursorContainer.innerHTML = ''; // Limpa o container
        cursorContainer.appendChild(cursor); // Adiciona o cursor primeiro

        const backspaceSpan = document.createElement('span');
        backspaceSpan.className = 'backspace-counter';
        backspaceSpan.textContent = `[ Backspace...10 ]`;
        backspaceSpan.style.color = '#ff0841'; // Vermelho fixo para "Backspace"
        cursorContainer.appendChild(backspaceSpan); // Adiciona o contador à direita

        let count = 10;
        const backspaceInterval = setInterval(() => {
            if (count > 1) {
                count--;
                backspaceSpan.textContent = `[ Backspace...${count} ]`;
            } else if (count === 1) {
                count--;
                backspaceSpan.textContent = `[ Backspace...${count} ]`;
                clearInterval(backspaceInterval);
                startEraseText(callback); // Inicia o apagamento após "[ Backspace...1 ]"
            }
        }, 1000);
    }

    // Função para apagar o texto
    function startEraseText(callback) {
        const texts = [titleText, descriptionText];
        const elements = [introTitle, introDescription];
        let textIndex = 1;
        let charIndex = 0;

        const eraseInterval = setInterval(() => {
            let wrapper = elements[textIndex].querySelector('.text-wrapper');
            if (wrapper && wrapper.innerHTML.length > 0) {
                const content = wrapper.innerHTML;
                if (content.endsWith('<br>')) {
                    wrapper.innerHTML = content.slice(0, -4); // Remove <br>
                } else {
                    wrapper.innerHTML = content.slice(0, -1); // Remove o último caractere
                }
            } else if (wrapper && wrapper.innerHTML.length === 0) {
                textIndex--;
                if (textIndex >= 0) {
                    wrapper = elements[textIndex].querySelector('.text-wrapper');
                    if (wrapper) {
                        charIndex = wrapper.innerHTML.length;
                    }
                }
            }
            if (textIndex < 0) {
                clearInterval(eraseInterval);
                cursorContainer.style.display = 'none';
                startInitCountdown(callback); // Inicia "Starting" após apagamento
            }
        }, 30); // Velocidade de apagamento
    }

    // Função de contagem de início após backspace
    function startInitCountdown(callback) {
        countdownContainer.style.display = 'block';
        countdownContainer.style.color = '#51d63a'; // Verde para "Starting"
        let count = 3;
        counterSpan.textContent = `[ Starting ...${count} ]`;

        const initInterval = setInterval(() => {
            count--;
            if (count > 0) {
                counterSpan.textContent = `[ Starting ...${count} ]`;
            } else {
                clearInterval(initInterval);
                countdownContainer.style.display = 'none';
                callback();
            }
        }, 1000);
    }

    // Função de digitação
    function typeText() {
        const texts = [titleText, descriptionText];
        const elements = [introTitle, introDescription];
        let textIndex = 0;
        let charIndex = 0;

        // Reinicia os wrappers a cada ciclo para evitar sobreposição
        introTitle.innerHTML = '';
        introDescription.innerHTML = '';
        const titleWrapper = document.createElement('span');
        titleWrapper.className = 'text-wrapper';
        introTitle.appendChild(titleWrapper);

        const descWrapper = document.createElement('span');
        descWrapper.className = 'text-wrapper';
        introDescription.appendChild(descWrapper);

        const wrappers = [titleWrapper, descWrapper];

        // Adiciona o cursor ao primeiro wrapper
        wrappers[0].appendChild(cursor);

        function typeNext() {
            if (textIndex < texts.length) {
                if (charIndex < texts[textIndex].length) {
                    if (cursor.parentNode) {
                        cursor.parentNode.removeChild(cursor);
                    }

                    const char = texts[textIndex][charIndex];
                    if (char === '\n') {
                        wrappers[textIndex].innerHTML += '<br>';
                    } else {
                        wrappers[textIndex].innerHTML += char;
                    }
                    charIndex++;

                    wrappers[textIndex].appendChild(cursor);
                } else {
                    textIndex++;
                    charIndex = 0;
                    elements[textIndex - 1].style.opacity = '1';
                    if (textIndex < texts.length) {
                        elements[textIndex].style.opacity = '1';
                        wrappers[textIndex].appendChild(cursor);
                    }
                }
                setTimeout(typeNext, 132);
            } else {
                setTimeout(() => {
                    startBackspaceCountdown(typeText);
                }, 1000);
            }
        }

        elements[0].style.opacity = '1';
        typeNext();
    }

    // Inicia o processo
    startCountdown(typeText);
});


//////////////////SLIDER////////////////////////////////////////////////
/////////////////////// Define a media query para o breakpoint de 1200px
document.addEventListener('DOMContentLoaded', () => {
    // Array de projetos
    const projects = [
        {
            title: "MLX CAPITAL",
            technologies: "HTML CSS JAVASCRIPT",
            descriptionImage: "Frontend desenvolvido na <a class='auclan-design' href='https://auclandesign.com/' target='_blank' rel='noopener noreferrer'>Auclan Design</a> para o cliente MLX CAPITAL.",
            descriptionText: [
                "Estrutura semântica em HTML5 com seções <span>header, section, footer</span> e elementos como <span>nav</span> e <span>img com alt</span>, assegurando acessibilidade e otimização para SEO.",
                "CSS modular com arquivos distintos <span>main.css, components.css, grid.css</span>, variáveis em <span>:root</span> (ex.: <span>--black-700</span>), grid responsivo e animações refinadas com <span>transition</span> e <span>.service-card:hover</span>.",
                "JavaScript interativo com carrossel contínuo usando <span>requestAnimationFrame e translateX</span> e menu responsivo via <span>addEventListener e classList</span>, integrando manipulação eficiente do DOM para interfaces modernas."
            ],
            image: "./img/frame_mlx.webp",
            link: "https://feryamaha.github.io/MLX-2025/",
            note: "Nota: Este deploy é uma versão preliminar, não refatorada como projeto final, servindo apenas como prévia de apresentação de projeto|experiência. <br> O link oficial não será divulgado devido a LGPD e direitos legais do cliente."
        },
        {
            title: "ALPHA",
            technologies: "HTML CSS JAVASCRIPT",
            descriptionImage: "Frontend desenvolvido na <a class='auclan-design' href='https://auclandesign.com/' target='_blank' rel='noopener noreferrer'>Auclan Design</a> para o cliente ALPHA.",
            descriptionText: [
                "Estrutura semântica em HTML5 com seções <span>header, section, footer</span> e elementos como <span>nav</span> e <span>img com alt</span>, assegurando acessibilidade e otimização para SEO.",
                "CSS modular com arquivos distintos <span>main.css, components.css, grid.css</span>, variáveis em <span>:root</span> (ex.: <span>--black-700</span>), grid responsivo e animações refinadas com <span>transition</span> e <span>.service-card:hover</span>.",
                "JavaScript interativo com carrossel contínuo usando <span>requestAnimationFrame e translateX</span> e menu responsivo via <span>addEventListener e classList</span>, integrando manipulação eficiente do DOM para interfaces modernas."
            ],
            image: "./img/frame-alpha.webp",
            link: "https://feryamaha.github.io/ALPHA-2025/",
            note: "Nota: Este deploy é uma versão preliminar, não refatorada como projeto final, servindo apenas como prévia de apresentação de projeto|experiência. <br> O link oficial não será divulgado devido a LGPD e direitos legais do cliente."
        },
        {
            title: "VEGA",
            technologies: "HTML SCSS JAVASCRIPT",
            descriptionImage: "Frontend desenvolvido na <a class='auclan-design' href='https://auclandesign.com/' target='_blank' rel='noopener noreferrer'>Auclan Design</a> para o cliente VEGA.",
            descriptionText: [
                "Estrutura semântica em HTML5 com seções <span>header, section, footer</span> e elementos como <span>nav</span> e <span>img com alt</span>, assegurando acessibilidade e otimização para SEO.",
                "CSS modular com arquivos distintos <span>main.css, components.css, grid.css</span>, variáveis em <span>:root</span> (ex.: <span>--black-700</span>), grid responsivo e animações refinadas com <span>transition</span> e <span>.service-card:hover</span>.",
                "JavaScript interativo com carrossel contínuo usando <span>requestAnimationFrame e translateX</span> e menu responsivo via <span>addEventListener e classList</span>, integrando manipulação eficiente do DOM para interfaces modernas."
            ],
            image: "./img/frame-vega.webp",
            link: "https://mayconmartins01.github.io/websitevega/",
            note: "Nota: Este deploy é uma versão preliminar, não refatorada como projeto final, servindo apenas como prévia de apresentação de projeto|experiência. <br> O link oficial não será divulgado devido a LGPD e direitos legais do cliente."
        },
        {
            title: "AUTODATAF",
            technologies: "REACT CSS-MODULES NODE.JS/EXPRESS POSTGRESQL(NEON) BCRYPT CORS VITE VERCEL",
            descriptionImage: "Autodata.F organiza cursos gratuitos do YouTube para estudo focado de programação.",
            descriptionText: [
                "Desenvolvida com React e CSS Modules no frontend, e Node.js com Express e PostgreSQL (Neon) no backend, Autodata.F oferece um ambiente seguro e interativo. Suas funcionalidades incluem um formulário de gerenciamento protegido por senha, navegação por cards responsivos, player de vídeo integrado via API React-YouTube, e temas que alternam automaticamente.",
                "A plataforma Autodata.F está em constante evolução e contará com a IA 'Yaminuelle', inspirada nas filhas do criador, Anthonella e Yasmim Emanuelle. Atualmente em fase de desenvolvimento e treinamento, ela permitirá pesquisas avançadas dentro da plataforma e na internet, por comandos de voz e texto, facilitando o acesso a cursos, vídeos e conteúdos relevantes."
            ],
            image: "./img/frame-autodataF.webp",
            link: "https://autodata-f.vercel.app/",
            note: "Nota: Autodata.F é um projeto pessoal, criado para praticar programação e organizar estudos com cursos gratuitos do YouTube. Não é aberto ao público e não tem fins lucrativos. Todos os conteúdos pertencem aos seus criadores originais."
        },
        {
            title: "PULSE COLOR",
            technologies: "HTML SASS JAVASCRIPT",
            descriptionImage: "Pulse Color é um projeto de portfólio que explora animações e interatividade com cores, formas e sons, criado a partir de exercícios de estudo das tecnologias aplicadas.",
            descriptionText: [
                "Desenvolvido com HTML5, SASS e JavaScript, o projeto apresenta seções hero com efeitos de pulsação, ondas e transições de cor por letra. Dez esferas geométricas animadas movem-se pela tela, colidem, mudam de cor e forma (círculo, quadrado, triângulo, etc.), e podem ser arrastadas pelo usuário, com feedback sonoro via Web Audio API.",
                "O projeto também inclui um cursor personalizado com rastro, gradiente de fundo animado e design responsivo ajustado por media queries. Animações são gerenciadas com a biblioteca AOS, e cores complementares são obtidas via API (thecolorapi.com), enriquecendo a experiência interativa."
            ],
            image: "./img/frame-pulse-COLOR.webp",
            link: "https://feryamaha.github.io/SASS/",
            note: ""
        }
    ];

    let currentIndex = 0;

    const updateCard = () => {
        const project = projects[currentIndex];

        // Seleciona os elementos com animações AOS dentro da seção de projetos
        const animatedElements = document.querySelectorAll('.wrapper__cards [data-aos]');

        // Passo 1: Esconde os elementos animados temporariamente
        animatedElements.forEach(el => {
            el.style.visibility = 'hidden'; // Remove da tela
            el.style.opacity = '0'; // Garante que a animação recomece
        });

        // Passo 2: Atualiza o conteúdo do card
        document.querySelector('.proj-card__image img').src = project.image;
        document.querySelector('.proj-card__image img').alt = `Imagem do projeto ${project.title}`;
        document.querySelector('.title-proj-image .title-project').textContent = project.title;
        document.querySelector('.title-proj-image h2').textContent = project.technologies;
        document.querySelector('.title-proj-image p').innerHTML = project.descriptionImage;
        document.querySelector('.title-proj-image .btn-card').href = project.link;
        document.querySelector('.title-proj-image .Obs_LGPD').innerHTML = project.note;

        document.querySelector('.proj-text-cotent .title-project').textContent = project.title;
        document.querySelector('.proj-text-cotent h2').textContent = project.technologies;
        document.querySelector('.proj-text-cotent > p').innerHTML = project.descriptionImage;

        const descriptionProj = document.querySelector('.description-proj');
        descriptionProj.innerHTML = '';
        project.descriptionText.forEach(desc => {
            const p = document.createElement('p');
            p.innerHTML = desc;
            descriptionProj.appendChild(p);
        });

        document.querySelector('.proj-text-cotent .btn-card').href = project.link;
        document.querySelector('.proj-text-cotent .Obs_LGPD').innerHTML = project.note;

        // Passo 3: Mostra os elementos novamente após um pequeno delay
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.visibility = 'visible'; // Volta a exibir
                el.style.opacity = '1'; // Restaura a opacidade
            });
        }, 50); // Delay para garantir que o DOM atualize antes de animar
    };

    // Eventos dos botões "next" e "back"
    document.getElementById('bt-ctrl-next').addEventListener('click', () => {
        if (currentIndex < projects.length - 1) {
            currentIndex++;
            updateCard();
        }
    });

    document.getElementById('bt-ctrl-back').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCard();
        }
    });

    // Inicializa o AOS com once: false para permitir múltiplas animações
    AOS.init({
        once: false, // Animações podem ser disparadas várias vezes
        duration: 800 // Ajuste a duração conforme necessário
    });

    // Carrega o primeiro projeto
    updateCard();
});