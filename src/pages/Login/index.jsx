import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice/apiCalls";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Button";
import logo from "../../images/Logo3.png";
import styles from "./styles.module.scss";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data, dispatch);
		} else {
			console.log("Por favor, rellene correctamente");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo_container}>
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<main className={styles.main}>
				<h1 className={styles.heading}>Para continuar, inicie sesión en Play4Sound.</h1>
				<form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label="Introduce tu correo electrónico"
							placeholder="Introduce tu correo electrónico"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Contraseña"
							placeholder="Contraseña"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							error={errors.password}
							type="password"
							required={true}
						/>
					</div>
					<p className={styles.forgot_password}>¿Olvidaste tu contraseña?</p>
					<div className={styles.form_bottom}>
					<Button
						type="submit"
						label="Inicia sesión"
						isFetching={isFetching}
						style={{ color: "#000000", background: "#E07400", width: "20rem" }}
					/>
					</div>
				</form>
				<h1 className={styles.dont_have_account}>¿No tienes cuenta?</h1>
				<Link to="/signup">
					<button className={styles.outline_btn}>Registrate</button>
				</Link>
			</main>
		</div>
	);
};

export default Login;
