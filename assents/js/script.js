//Questão atual
let questaoAtual = 0;
let acertos = 0

exibirQuestao();

//Evento
document.querySelector('.pontuacaoArea button').addEventListener('click', reiniciar);

//Funções
function exibirQuestao(){
    if(questoes[questaoAtual]){
        let q = questoes[questaoAtual];

        let pct = Math.floor((questaoAtual / questoes.length) * 100);
        document.querySelector('.barraProgresso').style.width = `${pct}%`;

        document.querySelector('.pontuacaoArea').style.display = 'none';
        document.querySelector('.questaoArea').style.display = 'block';
        
        document.querySelector('.questao ').innerHTML = q.questao;
        let opcoesHtml = '';
        for(let i in q.opcoes){
            opcoesHtml += `<div data-op='${i}' class='opcao'><span>${parseInt(i)+1}</span>${q.opcoes[i]}</div>`;
        }
        document.querySelector('.opcoes').innerHTML = opcoesHtml;

        document.querySelectorAll('.opcoes .opcao').forEach(item=>{
            item.addEventListener('click', opcaoEventoClick);
        });
    }else{
        quizFinalizado();
    }
}

function opcaoEventoClick(e){
    let opcaoSelecionada = parseInt(e.target.getAttribute('data-op'));

    if(questoes[questaoAtual].resposta === opcaoSelecionada){
        acertos++;
    } 

    questaoAtual++;
    
    exibirQuestao();
}

function quizFinalizado(){
    let pontos = Math.floor((acertos / questoes.length) * 100);

    if(pontos < 50){
        document.querySelector('.pontosTxt1').innerHTML = 'Você precisá melhorar...';
        document.querySelector('.pontosPct').style.color = '#FF0000';   
    } else if(pontos >= 50 && pontos < 80){
        document.querySelector('.pontosTxt1').innerHTML = 'Mandou bem!';
        document.querySelector('.pontosPct').style.color = '#FFFF00'; 
    }   else if(pontos >= 80 && pontos < 100){
        document.querySelector('.pontosTxt1').innerHTML = 'Mandou bem!';
        document.querySelector('.pontosPct').style.color = '#FFFF00'; 
    }


    document.querySelector('.pontosPct').innerHTML = `Acertou ${pontos}%`;
    document.querySelector('.pontosTxt2').innerHTML = `Você respondeu ${questoes.length} questões e acertou ${acertos}`;


    document.querySelector('.pontuacaoArea').style.display = 'block';
    document.querySelector('.questaoArea').style.display = 'none';
    document.querySelector('.barraProgresso').style.width = `100%`;
}

function reiniciar(){
    acertos = 0;
    questaoAtual = 0;
    exibirQuestao();
}