import { useState } from "react"
import styles from "./Formulario.module.css"

function Formulario() {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState('');
    const [erro, setErro] = useState('');

    const calcularIMC = () => {

        const alturaCorrigida = parseFloat(altura.replace(',', '.'));
        const pesoCorrigido = parseFloat(peso.replace(',', '.'));

        if (isNaN(alturaCorrigida) || isNaN(pesoCorrigido) || alturaCorrigida <= 0 || pesoCorrigido <= 0) {
            setErro('Insira valores válidos');
            return;
        }

        const alturaMetros = alturaCorrigida <= 3 ? alturaCorrigida : alturaCorrigida / 100;

        const imcCalculado = pesoCorrigido / (alturaMetros ** 2);

        setImc(imcCalculado.toFixed(2));
        setClassificacao(getClassificacao(imcCalculado));
        setErro('');

    };

    const getClassificacao = (imc) => {
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc < 24.9) return 'Peso normal';
        if (imc < 29.9) return 'Sobrepeso';
        if (imc < 34.9) return 'Obesidade grau 1';
        if (imc < 39.9) return 'Obesidade grau 2';
        return 'Obesidade grau 3'
    };

    const reset = () => {    
        setAltura('')
        setPeso('')
        setImc('')
        setClassificacao(null)
        setErro(null)
    }

    return (
        <div className="container">
            <div className={styles.form} >
                <h1>Calcule seu Índice de Massa Corporal</h1>
                <div>
                    <label className={styles.label} >Altura: </label>
                    <input className={styles.input} type="text" value={altura} onChange={e => setAltura(e.target.value.replace(/[^0-9.,]/g, ''))} />
                </div>
                <div>
                    <label className={styles.label} >Peso: </label>
                    <input className={styles.input} type="text" value={peso} onChange={e => setPeso(e.target.value.replace(/[^0-9.,]/g, ''))} />
                </div>
                <button className={styles.button} onClick={calcularIMC}>Calcular</button>
                <button className={styles.button} onClick={reset}>Resetar</button>
                {imc && (
                    <div className={styles.h3}>
                        <h3>IMC: {imc}</h3>
                        <h3>Classificação: {classificacao}</h3>
                    </div>
                )} 
                {erro && <div className={styles.alert}>{erro}</div>} 
            </div>
        </div>
    );
}

export default Formulario