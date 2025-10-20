<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xadrez JS - Regras Finais</title>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }

        header {
            margin-bottom: 20px;
        }

        h1 {
            color: #333;
        }

        main {
            display: flex;
            gap: 30px;
            max-width: 1200px;
            width: 100%;
            justify-content: center;
        }

        .info-panel {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #fff;
            height: fit-content;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        #status {
            font-size: 1.2em;
            font-weight: bold;
            color: #007bff;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
        }

        /* TABULEIRO AUMENTADO (80px) */
        #tabuleiro {
            display: grid;
            grid-template-columns: repeat(8, 80px); 
            grid-template-rows: repeat(8, 80px);
            border: 4px solid #333;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .casa {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 55px; 
            cursor: pointer;
            user-select: none;
            transition: background-color 0.15s;
        }

        .clara {
            background-color: #f0d9b5; 
        }

        .escura {
            background-color: #b58863; 
        }

        /* Estilos de interatividade */
        .casa:hover {
            box-shadow: inset 0 0 0 3px rgba(0, 123, 255, 0.7);
        }

        .selecionada {
            background-color: #fffa12 !important; 
        }

        .movimento-valido {
            background-color: #6dcc6d !important; 
            position: relative;
        }

        .movimento-valido::after {
            content: '';
            position: absolute;
            width: 25px; 
            height: 25px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.2); 
            pointer-events: none; 
        }

        /* Estilo dos Botões */
        button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            background-color: #007bff;
            color: white;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #0056b3;
        }

        /* -------------------- Estilo Geral dos Modais -------------------- */
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1000; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgba(0,0,0,0.6); 
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: #fefefe;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.5);
            width: 90%;
            max-width: 500px;
            text-align: center;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 35px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .modal-content h2 {
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            color: #333;
        }

        /* -------------------- Estilo do Modal de Promoção -------------------- */
        #promocao-modal h2 {
            color: #28a745;
        }
        .peca-promocao {
            font-size: 50px;
            padding: 10px;
            margin: 5px;
            border: 2px solid #ccc;
            border-radius: 8px;
            cursor: pointer;
            display: inline-block;
            transition: transform 0.2s, border-color 0.2s;
            background-color: #f8f9fa;
        }
        .peca-promocao:hover {
            transform: scale(1.1);
            border-color: #007bff;
        }
    </style>
</head>
<body>

    <header>
        <h1>Xadrez Simples em JavaScript</h1>
    </header>

    <main>
        <div class="info-panel">
            <div id="status">🎮 Vez das Brancas</div>
            <div id="pecasBrancas">⚪ Brancas: 16</div>
            <div id="pecasPretas">⚫ Pretas: 16</div>
            <button id="btnReiniciar">🔄 Reiniciar Jogo</button>
            <button id="btnAjuda">❓ Ajuda</button>
        </div>

        <div id="tabuleiro">
            </div>
    </main>

    <div id="ajuda-modal" class="modal">
        <div class="modal-content">
            <span class="close" data-modal-target="ajuda-modal">&times;</span>
            <h2>Ajuda e Regras</h2>
            <p>Este é um jogo de Xadrez básico, com as regras essenciais implementadas:</p>
            <ul>
                <li>O **Rei não pode se mover** para nenhuma casa atacada.</li>
                <li>A **Promoção do Peão** é feita através da janela de seleção.</li>
                <li>A verificação de **Xeque-Mate** está implementada.</li>
                <li>*Roque e En Passant não estão implementados.*</li>
            </ul>
            <p>Clique na peça da sua cor, e depois clique na casa de destino (verde).</p>
        </div>
    </div>

    <div id="promocao-modal" class="modal">
        <div class="modal-content">
            <h2>🎉 Promoção do Peão! 🎉</h2>
            <p>Selecione a peça para qual o peão será promovido:</p>
            <div id="opcoes-promocao">
                </div>
        </div>
    </div>


    <script>
        const PECAS = {
            BRANCA: { REI: '♔', RAINHA: '♕', TORRE: '♖', BISPO: '♗', CAVALO: '♘', PEAO: '♙' },
            PRETA: { REI: '♚', RAINHA: '♛', TORRE: '♜', BISPO: '♝', CAVALO: '♞', PEAO: '♟' }
        };

        let tabuleiro = [];
        let vezAtual = 'BRANCA';
        let pecaSelecionada = null;
        let movimentosValidos = [];
        let promocaoPosicao = null; 

        // ========================================
        // INICIALIZAÇÃO E AUXILIARES
        // ========================================
        function inicializarTabuleiro() {
            tabuleiro = Array(8).fill(null).map(() => Array(8).fill(null));
            
            tabuleiro[0] = [
                {tipo: 'TORRE', cor: 'PRETA', moveu: false}, {tipo: 'CAVALO', cor: 'PRETA'},
                {tipo: 'BISPO', cor: 'PRETA'}, {tipo: 'RAINHA', cor: 'PRETA'},
                {tipo: 'REI', cor: 'PRETA', moveu: false}, {tipo: 'BISPO', cor: 'PRETA'},
                {tipo: 'CAVALO', cor: 'PRETA'}, {tipo: 'TORRE', cor: 'PRETA', moveu: false}
            ];
            for (let c = 0; c < 8; c++) tabuleiro[1][c] = {tipo: 'PEAO', cor: 'PRETA', moveu: false};
            for (let c = 0; c < 8; c++) tabuleiro[6][c] = {tipo: 'PEAO', cor: 'BRANCA', moveu: false};
            tabuleiro[7] = [
                {tipo: 'TORRE', cor: 'BRANCA', moveu: false}, {tipo: 'CAVALO', cor: 'BRANCA'},
                {tipo: 'BISPO', cor: 'BRANCA'}, {tipo: 'RAINHA', cor: 'BRANCA'},
                {tipo: 'REI', cor: 'BRANCA', moveu: false}, {tipo: 'BISPO', cor: 'BRANCA'},
                {tipo: 'CAVALO', cor: 'BRANCA'}, {tipo: 'TORRE', cor: 'BRANCA', moveu: false}
            ];
            
            vezAtual = 'BRANCA';
            pecaSelecionada = null;
            movimentosValidos = [];
            promocaoPosicao = null;
        }

        function encontrarRei(cor) {
            for (let l = 0; l < 8; l++) {
                for (let c = 0; c < 8; c++) {
                    const peca = tabuleiro[l][c];
                    if (peca && peca.tipo === 'REI' && peca.cor === cor) return {l, c};
                }
            }
            return null;
        }

        function dentroTabuleiro(l, c) {
            return l >= 0 && l < 8 && c >= 0 && c < 8;
        }

        function atualizarStatus() {
            const statusDiv = document.getElementById('status');
            if (statusDiv) statusDiv.textContent = '🎮 Vez das ' + (vezAtual === 'BRANCA' ? 'Brancas' : 'Pretas');
            contarPecas();
        }

        function contarPecas() {
            let brancas = 0, pretas = 0;
            for (let l = 0; l < 8; l++) {
                for (let c = 0; c < 8; c++) {
                    const peca = tabuleiro[l][c];
                    if (peca) {
                        if (peca.cor === 'BRANCA') brancas++;
                        else pretas++;
                    }
                }
            }
            document.getElementById('pecasBrancas').textContent = '⚪ Brancas: ' + brancas;
            document.getElementById('pecasPretas').textContent = '⚫ Pretas: ' + pretas;
        }

        function reiniciarJogo() {
            inicializarTabuleiro();
            renderizarTabuleiro();
        }

        function mostrarModal(id) {
            document.getElementById(id).style.display = 'flex';
        }

        function fecharModal(id) {
            document.getElementById(id).style.display = 'none';
        }

        // ========================================
        // RENDERIZAÇÃO E INTERAÇÃO
        // ========================================
        function renderizarTabuleiro() {
            const tabuleiroDiv = document.getElementById('tabuleiro');
            if (!tabuleiroDiv) return;
            
            tabuleiroDiv.innerHTML = '';
            
            for (let l = 0; l < 8; l++) {
                for (let c = 0; c < 8; c++) {
                    const casa = document.createElement('div');
                    casa.className = 'casa ' + ((l + c) % 2 === 0 ? 'clara' : 'escura');
                    casa.dataset.linha = l;
                    casa.dataset.coluna = c;
                    
                    const peca = tabuleiro[l][c];
                    if (peca) casa.textContent = PECAS[peca.cor][peca.tipo];
                    
                    if (pecaSelecionada && pecaSelecionada.l === l && pecaSelecionada.c === c) {
                        casa.classList.add('selecionada');
                    }
                    
                    if (movimentosValidos.some(m => m.l === l && m.c === c)) {
                        casa.classList.add('movimento-valido');
                    }
                    
                    casa.addEventListener('click', () => clicarCasa(l, c));
                    tabuleiroDiv.appendChild(casa);
                }
            }
            
            atualizarStatus();
        }

        function clicarCasa(l, c) {
            if (promocaoPosicao) return; 

            const peca = tabuleiro[l][c];
            
            if (pecaSelecionada) {
                const movValido = movimentosValidos.find(m => m.l === l && m.c === c);
                
                if (movValido) {
                    moverPeca(pecaSelecionada.l, pecaSelecionada.c, l, c);
                    pecaSelecionada = null;
                    movimentosValidos = [];
                    
                    if (!promocaoPosicao) {
                        vezAtual = vezAtual === 'BRANCA' ? 'PRETA' : 'BRANCA';
                        verificarFimDeTurno();
                    }
                    
                    renderizarTabuleiro();
                    return;
                } else if (peca && peca.cor === vezAtual) {
                    pecaSelecionada = {l, c};
                    movimentosValidos = calcularMovimentosValidos(l, c);
                } else {
                    pecaSelecionada = null;
                    movimentosValidos = [];
                }
            } else {
                if (peca && peca.cor === vezAtual) {
                    pecaSelecionada = {l, c};
                    movimentosValidos = calcularMovimentosValidos(l, c);
                }
            }
            
            renderizarTabuleiro();
        }

        function verificarFimDeTurno() {
            setTimeout(() => {
                if (verificarXequeMate()) {
                    const vencedor = vezAtual === 'BRANCA' ? 'Pretas' : 'Brancas';
                    alert('🎉 XEQUE-MATE! 🎉\n\n' + vencedor + ' venceram o jogo!');
                    if (confirm('Deseja jogar novamente?')) reiniciarJogo();
                } else if (verificarXeque(vezAtual)) {
                    alert('⚠️ XEQUE!\n\nO Rei ' + (vezAtual === 'BRANCA' ? 'Branco' : 'Preto') + ' está em perigo!\nVocê DEVE mover para sair do xeque.');
                }
            }, 100);
        }

        // ========================================
        // REGRAS E CÁLCULO DE MOVIMENTOS
        // ========================================
        
        /**
         * Calcula todos os movimentos válidos de uma peça, já filtrando aqueles que
         * colocam ou mantêm o próprio Rei em xeque.
         */
        function calcularMovimentosValidos(l, c) {
            const peca = tabuleiro[l][c];
            if (!peca) return [];
            
            let movimentos = [];
            
            switch (peca.tipo) {
                case 'PEAO':
                    const dir = peca.cor === 'BRANCA' ? -1 : 1;
                    
                    // Movimento para frente (1 casa)
                    if (dentroTabuleiro(l + dir, c) && !tabuleiro[l + dir][c]) {
                        movimentos.push({l: l + dir, c});
                        
                        // Primeiro movimento (2 casas)
                        if (!peca.moveu && dentroTabuleiro(l + 2 * dir, c) && !tabuleiro[l + 2 * dir][c]) {
                            movimentos.push({l: l + 2 * dir, c});
                        }
                    }
                    
                    // Captura diagonal
                    for (let dc of [-1, 1]) {
                        if (dentroTabuleiro(l + dir, c + dc)) {
                            const alvo = tabuleiro[l + dir][c + dc];
                            if (alvo && alvo.cor !== peca.cor) {
                                movimentos.push({l: l + dir, c: c + dc});
                            }
                        }
                    }
                    break;
                    
                case 'TORRE':
                    movimentos = movimentos.concat(calcularMovimentosLinha(l, c, [[1,0],[-1,0],[0,1],[0,-1]]));
                    break;
                    
                case 'CAVALO':
                    const movsCavalo = [[-2,-1], [-2,1], [-1,-2], [-1,2], [1,-2], [1,2], [2,-1], [2,1]];
                    for (let [dl, dc] of movsCavalo) {
                        if (dentroTabuleiro(l + dl, c + dc)) {
                            const alvo = tabuleiro[l + dl][c + dc];
                            if (!alvo || alvo.cor !== peca.cor) { 
                                movimentos.push({l: l + dl, c: c + dc});
                            }
                        }
                    }
                    break;
                    
                case 'BISPO':
                    movimentos = movimentos.concat(calcularMovimentosLinha(l, c, [[1,1],[1,-1],[-1,1],[-1,-1]]));
                    break;
                    
                case 'RAINHA':
                    movimentos = movimentos.concat(calcularMovimentosLinha(l, c, [
                        [1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]
                    ]));
                    break;
                    
                case 'REI':
                    let reiMovs = [];
                    // Gera todos os 8 movimentos possíveis do rei
                    for (let dl = -1; dl <= 1; dl++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dl === 0 && dc === 0) continue;
                            const nl = l + dl;
                            const nc = c + dc;
                            if (dentroTabuleiro(nl, nc)) {
                                const alvo = tabuleiro[nl][nc];
                                if (!alvo || alvo.cor !== peca.cor) {
                                    reiMovs.push({l: nl, c: nc});
                                }
                            }
                        }
                    }
                    movimentos = reiMovs;
                    break;
            }
            
            // FILTRO ESSENCIAL: O movimento não pode colocar ou manter o Rei em xeque
            return movimentos.filter(mov => !causaXeque(l, c, mov.l, mov.c, peca.cor));
        }

        function calcularMovimentosLinha(l, c, direcoes) {
            const movimentos = [];
            const peca = tabuleiro[l][c];
            
            for (let [dl, dc] of direcoes) {
                for (let i = 1; i < 8; i++) {
                    const nl = l + dl * i;
                    const nc = c + dc * i;
                    
                    if (!dentroTabuleiro(nl, nc)) break;
                    
                    const alvo = tabuleiro[nl][nc];
                    if (!alvo) {
                        movimentos.push({l: nl, c: nc});
                    } else {
                        if (alvo.cor !== peca.cor) {
                            movimentos.push({l: nl, c: nc});
                        }
                        break; // Bloqueado, mesmo se capturar
                    }
                }
            }
            return movimentos;
        }

        // ========================================
        // MOVIMENTO, XEQUE E PROMOÇÃO
        // ========================================
        
        function moverPeca(lOrigem, cOrigem, lDestino, cDestino) {
            const peca = tabuleiro[lOrigem][cOrigem];
            
            tabuleiro[lDestino][cDestino] = peca;
            tabuleiro[lOrigem][cOrigem] = null;
            
            if (peca.tipo === 'PEAO') {
                peca.moveu = true;
                
                if ((peca.cor === 'BRANCA' && lDestino === 0) || (peca.cor === 'PRETA' && lDestino === 7)) {
                    promocaoPosicao = {l: lDestino, c: cDestino};
                    mostrarModalPromocao(peca.cor);
                }
            }
            if (peca.tipo === 'TORRE' || peca.tipo === 'REI') {
                peca.moveu = true;
            }
        }

        /**
         * Simula um movimento (lOrigem, cOrigem -> lDestino, cDestino) e verifica 
         * se o REI da cor COR estaria em XEQUE após a simulação.
         */
        function causaXeque(lOrigem, cOrigem, lDestino, cDestino, cor) {
            const pecaOrigem = tabuleiro[lOrigem][cOrigem];
            const pecaDestino = tabuleiro[lDestino][cDestino];
            
            if (!pecaOrigem) return false; 
            
            // 1. Simula o movimento
            tabuleiro[lDestino][cDestino] = pecaOrigem;
            tabuleiro[lOrigem][cOrigem] = null;
            
            // 2. Verifica o xeque
            const emXeque = verificarXeque(cor);
            
            // 3. Desfaz o movimento (Restauração)
            tabuleiro[lOrigem][cOrigem] = pecaOrigem;
            tabuleiro[lDestino][cDestino] = pecaDestino;
            
            return emXeque;
        }

        /**
         * Verifica se o Rei da COR está sob ataque no tabuleiro ATUAL.
         */
        function verificarXeque(cor) {
            const posRei = encontrarRei(cor);
            if (!posRei) return false;
            
            const corAdversaria = cor === 'BRANCA' ? 'PRETA' : 'BRANCA';
            
            for (let l = 0; l < 8; l++) {
                for (let c = 0; c < 8; c++) {
                    const peca = tabuleiro[l][c];
                    if (peca && peca.cor === corAdversaria) {
                        // Calcula os movimentos que *ameaçam* (sem filtro de xeque)
                        const movs = calcularMovimentosAmeaca(l, c);
                        if (movs.some(m => m.l === posRei.l && m.c === posRei.c)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function verificarXequeMate() {
            if (!verificarXeque(vezAtual)) return false;
            
            // Se está em xeque, verifica se há algum movimento válido para sair
            for (let l = 0; l < 8; l++) {
                for (let c = 0; c < 8; c++) {
                    const peca = tabuleiro[l][c];
                    if (peca && peca.cor === vezAtual) {
                        if (calcularMovimentosValidos(l, c).length > 0) return false;
                    }
                }
            }
            return true; 
        }

        /**
         * Calcula todos os movimentos de ataque/captura de uma peça, 
         * ignorando as regras de xeque e focando apenas no potencial de ataque.
         */
        function calcularMovimentosAmeaca(l, c) {
            const peca = tabuleiro[l][c];
            if (!peca) return [];
            
            let movimentos = [];
            
            // Reutiliza a lógica central de movimento, mas sem o filtro final de xeque
            switch (peca.tipo) {
                case 'PEAO':
                    const dir = peca.cor === 'BRANCA' ? -1 : 1;
                    // Peão ataca apenas diagonais
                    for (let dc of [-1, 1]) {
                        if (dentroTabuleiro(l + dir, c + dc)) movimentos.push({l: l + dir, c: c + dc});
                    }
                    break; 
                case 'TORRE':
                    movimentos = calcularMovimentosLinhaAmeaca(l, c, [[1,0],[-1,0],[0,1],[0,-1]]);
                    break;
                case 'CAVALO':
                    const movsCavalo = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
                    for (let [dl, dc] of movsCavalo) {
                        if (dentroTabuleiro(l + dl, c + dc)) movimentos.push({l: l + dl, c: c + dc});
                    }
                    break;
                case 'BISPO':
                    movimentos = calcularMovimentosLinhaAmeaca(l, c, [[1,1],[1,-1],[-1,1],[-1,-1]]);
                    break;
                case 'RAINHA':
                    movimentos = calcularMovimentosLinhaAmeaca(l, c, [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
                    break;
                case 'REI':
                    for (let dl = -1; dl <= 1; dl++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dl === 0 && dc === 0) continue;
                            if (dentroTabuleiro(l + dl, c + dc)) movimentos.push({l: l + dl, c: c + dc});
                        }
                    }
                    break; 
            }

            // Filtra movimentos para casas ocupadas pela própria cor
            return movimentos.filter(mov => {
                const alvo = tabuleiro[mov.l][mov.c];
                return !alvo || alvo.cor !== peca.cor;
            });
        }
        
        // Versão de cálculo de linha para AMEAÇA/ATAQUE (parecida com a normal)
        function calcularMovimentosLinhaAmeaca(l, c, direcoes) {
            const movimentos = [];
            const peca = tabuleiro[l][c];
            
            for (let [dl, dc] of direcoes) {
                for (let i = 1; i < 8; i++) {
                    const nl = l + dl * i;
                    const nc = c + dc * i;
                    
                    if (!dentroTabuleiro(nl, nc)) break;
                    
                    const alvo = tabuleiro[nl][nc];
                    if (!alvo) {
                        movimentos.push({l: nl, c: nc});
                    } else {
                        // Pode capturar uma peça de cor diferente (ou ameaçar um rei)
                        movimentos.push({l: nl, c: nc});
                        break; // Bloqueado, mesmo se capturar
                    }
                }
            }
            return movimentos;
        }


        // ========================================
        // MODAL DE PROMOÇÃO
        // ========================================
        function mostrarModalPromocao(cor) {
            const opcoesDiv = document.getElementById('opcoes-promocao');
            const pecasOpcoes = ['RAINHA', 'TORRE', 'BISPO', 'CAVALO'];
            opcoesDiv.innerHTML = '';

            pecasOpcoes.forEach(tipo => {
                const pecaSimbolo = PECAS[cor][tipo];
                const btn = document.createElement('span');
                
                btn.className = 'peca-promocao';
                btn.textContent = pecaSimbolo;
                btn.dataset.tipo = tipo;
                
                btn.addEventListener('click', () => {
                    promoverPeao(tipo); 
                });

                opcoesDiv.appendChild(btn);
            });

            mostrarModal('promocao-modal');
        }

        function promoverPeao(novoTipo) {
            const {l, c} = promocaoPosicao;
            const peca = tabuleiro[l][c];
            
            tabuleiro[l][c] = {tipo: novoTipo, cor: peca.cor, moveu: true}; 
            
            fecharModal('promocao-modal');
            promocaoPosicao = null; 

            vezAtual = vezAtual === 'BRANCA' ? 'PRETA' : 'BRANCA';
            renderizarTabuleiro();
            verificarFimDeTurno(); 
        }

        // ========================================
        // EVENT LISTENERS E INÍCIO DO JOGO
        // ========================================

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('btnReiniciar').addEventListener('click', reiniciarJogo);
            document.getElementById('btnAjuda').addEventListener('click', () => mostrarModal('ajuda-modal'));
            
            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetId = e.target.dataset.modalTarget || e.target.closest('.modal').id;
                    fecharModal(targetId);
                });
            });

            window.addEventListener('click', (event) => {
                if (event.target === document.getElementById('ajuda-modal')) {
                    fecharModal('ajuda-modal');
                }
            });

            inicializarTabuleiro();
            renderizarTabuleiro();
        });
    </script> 
</body>
</html>
