import styles from './page.module.css';
import MultiStepForm from "@/components/Cadastro/MultiStepForm";



export default function Cadastro() {


    return(
        <section id="Cadastro" className={`flex-row`}>     
          <div className={`${styles.cadastro} bg-violet-400`}></div>                   
            <MultiStepForm />
        </section>
    )
}