import Notiflix from "notiflix";
import "./App.css";
import styles from "../components/Form/Form.module.css";
import React from "react";
import Contact from "../components/Contact/Contact";
import Form from "../components/Form/Form";
import Filter from "../components/Filter/Filter";
import { useState } from "react";

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // const componentDidMount = () => {
  //   const contactsJson = JSON.parse(localStorage.getItem("contacts"));
  //   if (contactsJson) setContacts(contactsJson);
  // };

  // const componentDidUpdate = () => {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // };

  const renderContact = ({ name, number, id }) => {
    const item = {
      id,
      name,
      number,
    };

    if (contacts.some((item) => item.name === name)) {
      return Notiflix.Notify.warning(`${name} is already in contacts`);
    } else if (contacts.some((item) => item.number === number)) {
      return Notiflix.Notify.warning(`${number} is already in contacts`);
    } else {
      setContacts({ item });
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
    }
  };

  const filteredContacts = () => {
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter)
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.mainTitle}>Phonebook</h1>
        <Form onSubmit={renderContact}></Form>
        <h2 className={styles.mainTitle}>Contacts</h2>
        <Filter onChange={handleInputChange} value={filter}></Filter>
        <Contact filter={filteredContacts} onClick={deleteContact} />
      </div>
    </div>
  );
};

export default App;
