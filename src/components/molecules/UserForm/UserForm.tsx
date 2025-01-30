import Button from "@atoms/Button/Button";
import TextField from "@atoms/TextField/TextField";
import { useAddUser, useModifyUser } from "@hooks/mutations";
import { useUsers } from "@hooks/queries";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "store/useAuth";
import { IUser } from "types/userType";
import "./UserForm.scss";
import Title from "@atoms/Title/Title";
import AlertMessage from "@molecules/AlertMessage/AlertMessage";
import { LinearProgress } from "@mui/material";

const UserForm = () => {
  const { user, login } = useAuth();
  const { mutate: addUser, isPending, isSuccess } = useAddUser();
  const { mutate: modifyUser, isSuccess: isModifySuccess } = useModifyUser();
  const { data: users, isLoading } = useUsers();
  const [success, setSucces] = useState(false);
  useEffect(() => {
    if (isModifySuccess || isSuccess) {
      setSucces(true);
    }
  }, [isModifySuccess, isSuccess]);
  const initialValues: IUser = {
    movies: user?.movies || [],
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const nameRegex = /^[a-zA-ZÀ-ÿ-]+$/; // Seulement lettres et tirets
    const userNameRegex = /^[a-zA-Z0-9_.-]+$/; // Lettres, chiffres, points, underscores et tirets
    const minLength = 2;

    if (
      formData.firstName.length < minLength ||
      !nameRegex.test(formData.firstName)
    ) {
      newErrors.firstName =
        "Le prénom doit contenir au moins 2 caractères et ne pas contenir de caractères spéciaux ni d'espaces.";
    }

    if (
      formData.lastName.length < minLength ||
      !nameRegex.test(formData.lastName)
    ) {
      newErrors.lastName =
        "Le nom doit contenir au moins 2 caractères et ne pas contenir de caractères spéciaux ni d'espaces.";
    }

    if (
      formData.userName.length < minLength ||
      !userNameRegex.test(formData.userName)
    ) {
      newErrors.userName =
        "Le nom d'utilisateur doit contenir au moins 2 caractères et ne doit pas contenir d'espaces.";
    }

    if (user) {
      const userNameExists = users?.some(
        (u) =>
          u.userName.toLowerCase() === formData.userName.toLowerCase().trim() &&
          u.id !== user.id
      );

      if (userNameExists) {
        newErrors.userName = "Ce nom d'utilisateur est déjà pris.";
      }
    } else {
      const userNameExists = users?.some(
        (u) =>
          u.userName.toLowerCase() === formData.userName.toLowerCase().trim()
      );
      if (userNameExists) {
        newErrors.userName = "Ce nom d'utilisateur est déjà pris.";
      }
    }

    if (!user) {
      const emailExists = users?.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase().trim()
      );
      if (emailExists) {
        newErrors.email = "Cet email est déjà utilisé.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const controledValue = value.replace(/\s/g, "");
    setFormData({
      ...formData,
      [name]: controledValue,
    });
    setSucces(false);
    setErrors({ ...errors, [name]: "" });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!user) {
      addUser(formData);
      setFormData(initialValues);
    } else {
      const userUpdated = { ...formData, id: user.id };
      modifyUser(userUpdated);
      login(userUpdated);
    }
  };

  return (
    <>
      {isLoading || (isPending && <LinearProgress color="success" />)}
      <form onSubmit={handleSubmit}>
        <Title label={user ? "Modifiez votre profil" : "S'inscrire"} />
        <TextField
          label="Nom d'utilisateur *"
          placeholder="Mathilde.293"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
        />
        <TextField
          label="Prénom *"
          placeholder="Mathilde"
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
        />
        <TextField
          label="Nom *"
          placeholder="Puget"
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
        />
        <TextField
          label="Email *"
          placeholder="mathilde.puget@hotmail.com"
          value={formData.email}
          onChange={handleChange}
          disabled={!!user}
          type="email"
          name="email"
        />
        <Button
          disabled={!!isPending}
          type="submit"
          label={user ? "Modifier votre profil" : "S'inscrire"}
        />
      </form>
      {errors.userName && (
        <AlertMessage isErrorMessage message={errors.userName} />
      )}
      {errors.firstName && (
        <AlertMessage isErrorMessage message={errors.firstName} />
      )}
      {errors.lastName && (
        <AlertMessage isErrorMessage message={errors.lastName} />
      )}
      {errors.email && <AlertMessage isErrorMessage message={errors.email} />}
      {success && (
        <AlertMessage
          message={
            user
              ? "Votre compte a bien été modifié"
              : "Votre compte a bien été créé"
          }
        />
      )}
    </>
  );
};

export default UserForm;
