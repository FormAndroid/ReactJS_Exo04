import { useState } from "react";

const regexNb = /^(-)?(\d*(\d(,|\.)\d*)?)?$/ ;

const Calculatrice = (props) => {

    const [numbers, setNumbers] = useState({
        nb1: '',
        nb2: ''
    });
    const [operateur, setOperateur] = useState('*');
    const [result, setResult] = useState('');

    const handleNumber = (e) => {
        const {value, name} = e.target;

        if(value === '' || regexNb.test(value)) {
           setNumbers({
               ...numbers,  // Permet de ne pas perde de valeur
               [name]: value
           });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setResult(() => {
            const nb1 = parseFloat(numbers.nb1);
            const nb2 = parseFloat(numbers.nb2);

            if(isNaN(nb1) || isNaN(nb2)) {
                return 'Valeur invalide'
            }

            switch (operateur) {
                case '+':
                    return nb1 + nb2;
                case '-':
                    return nb1 - nb2;
                case '*':
                    return nb1 * nb2;
                case '/':
                    return (nb2 !== 0) ? (nb1 / nb2) : 'Division par zero';
            }
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nb1">Nombre 1 </label>
                <input type="text" id="nb1" onChange={handleNumber} value={numbers.nb1} name="nb1" />
            </div>
            <div>
                <label htmlFor="op">Operation</label>
                <select id="op" onChange={(e) => setOperateur(e.target.value)} value={operateur}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">X</option>
                    <option value="/">/</option>
                </select>
            </div>
            <div>
                <label htmlFor="nb2">Nombre 2 </label>
                <input type="text" id="nb2" onChange={handleNumber} value={numbers.nb2} name="nb2" />
            </div>
            <div>
                <button type="submit">Calculer</button>
            </div>
            <div>
                <label htmlFor="res">Resultat </label>
                <input type="text" id="res" readOnly value={result} />
            </div>
        </form>
    );
}


export default Calculatrice;