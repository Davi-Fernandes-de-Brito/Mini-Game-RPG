let personagem = {
    nome:"",
    equipamentos:[
        {
            nome:"Espada",
            nivel:1
        },
        {
            nome:"Armadura",
            nivel:1
        },
        {
            nome:"Escudo",
            nivel:1
        }
    ]
}
const fases = [
    {
        numero:1,
        nome:"A Porta",
        equipamento:"Espada",
        nivelNecessario:2
    },
    {
        numero:2,
        nome:"A Ponte",
        equipamento:"Escudo",
        nivelNecessario:3
    },
    {
        numero:3,
        nome:"A Floresta",
        equipamento:"Armadura",
        nivelNecessario:4
    },
    {
        numero:4,
        nome:"A Fortaleza",
        equipamento:"Espada",
        nivelNecessario:5
    },
    {
        numero:5,
        nome:"ROBSON: THE FINAL BOSS",
        equipamento:["Espada","Armadura","Escudo"],
        nivelNecessario:6
    }
]
function mostrarEquipamentos(personagem){
    let mensagem = "EQUIPAMENTOS DE " + personagem.nome + "\n\n"
    personagem.equipamentos.forEach(equipamento => {
        mensagem += equipamento.nome + " - Nível " + equipamento.nivel + "\n"
    })
    alert(mensagem)
}
function mostrarFase(fase){
    alert(
        "FASE " + fase.numero + " - " + fase.nome + "\n\n" +
        "Equipamento necessário: " +
        (fase.numero === 5 ? "Todos os equipamentos" : fase.equipamento) +
        "\n" +
        "Nível necessário: " + fase.nivelNecessario
    )
}
function verificarDesafio(personagem,fase){
    if(fase.numero < 5){
        let nivelDoEquipamento = 0
        for(let i = 0; i < personagem.equipamentos.length; i++){
            if(personagem.equipamentos[i].nome === fase.equipamento){
                nivelDoEquipamento = personagem.equipamentos[i].nivel
            }
        }
        console.log("Equipamento utilizado: " + fase.equipamento)
        console.log("Nível do equipamento: " + nivelDoEquipamento)
        if(nivelDoEquipamento >= fase.nivelNecessario){
            return true
        }else{
            return false
        }
        }else{
            let todosEquipamentos = true
            for(let i = 0; i < fase.equipamento.length; i++){
                let equipamentoEncontrado = false
                for(let j = 0; j < personagem.equipamentos.length; j++){
                    if(personagem.equipamentos[j].nome === fase.equipamento[i]){
                        if(personagem.equipamentos[j].nivel >= fase.nivelNecessario){
                            equipamentoEncontrado = true
                        }
                    }
                }
                if(equipamentoEncontrado === false){
                    todosEquipamentos = false
                }
            }
            return todosEquipamentos
        }
}
function melhorarEquipamento(personagem){
    let escolha = prompt(
        "Qual equipamento você deseja melhorar?\n\n" +
        "1 - Espada\n" +
        "2 - Armadura\n" +
        "3 - Escudo"
    )
    if(escolha === "1"){
        personagem.equipamentos[0].nivel++
        alert("Espada melhorada para o nível " + personagem.equipamentos[0].nivel + "!")
    }else if(escolha === "2"){
        personagem.equipamentos[1].nivel++
        alert("Armadura melhorada para o nível " + personagem.equipamentos[1].nivel + "!")
    }else if(escolha === "3"){
        personagem.equipamentos[2].nivel++
        alert("Escudo melhorado para o nível " + personagem.equipamentos[2].nivel + "!")
    }else{
        alert("Opção inválida.")
    }
}
function iniciarJogo(){
    personagem.nome = prompt("Digite o nome do seu personagem:")
    if(personagem.nome === null || personagem.nome === ""){
        alert("Nome inválido. Jogo encerrado.")
        return
    }
    let faseAtual = 0
    let jogando = true
    let historicoDeTentativas = []
    alert("Bem-vindo, " + personagem.nome + "!\nSua aventura começa agora!")
    while(jogando === true && faseAtual < fases.length){
        let fase = fases[faseAtual]
        mostrarFase(fase)
        let opcao = prompt(
            "O que deseja fazer?\n\n" +
            "1 - Ver equipamentos\n" +
            "2 - Tentar desafio\n" +
            "3 - Melhorar equipamento\n" +
            "4 - Sair"
        )
        if(opcao === "1"){
            mostrarEquipamentos(personagem)
        }else if(opcao === "2"){
            let venceu = verificarDesafio(personagem,fase)
            historicoDeTentativas.push({
                fase:fase.numero,
                venceu:venceu
            })
            if(venceu === true){
                alert("Você venceu a fase " + fase.numero + "!" + "Você é aberto!")
                faseAtual++
                if(faseAtual === fases.length){
                    alert("PARABÉNS, " + personagem.nome + "!\nVocê concluiu todas as fases!")
                    console.log("HISTÓRICO DE TENTATIVAS")
                    historicoDeTentativas.forEach(tentativa => {
                        console.log(
                            "Fase " + tentativa.fase +
                            " - " +
                            (tentativa.venceu ? "Vitória" : "Derrota")
                        )
                    })
                    jogando = false
                }
            }else{
                alert(
                    "Você perdeu o desafio!\n\n" +
                    "Seu equipamento ainda não possui nível suficiente."
                )
            }
        }else if(opcao === "3"){
            melhorarEquipamento(personagem)
        }else if(opcao === "4"){
            alert("Jogo encerrado.")
            jogando = false
        }else{
            alert("Opção inválida. Escolha uma opção de 1 a 4.")
        }
    }
}
iniciarJogo()