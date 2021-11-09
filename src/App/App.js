import Notiflix from "notiflix";
import "./App.css";
import styles from "../components/Form/Form.module.css";
import Contact from "../components/Contact/Contact";
import Form from "../components/Form/Form";
import Filter from "../components/Filter/Filter";
import { useState, useEffect } from "react";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const renderContact = (contact) => {
    if (contacts.some((item) => item.name.toLowerCase() === contact.name)) {
      return Notiflix.Notify.warning(`${contact.name} is already in contacts`);
    } else if (
      contacts.some((item) => item.number.toLowerCase() === contact.number)
    ) {
      return Notiflix.Notify.warning(
        `${contact.number} is already in contacts`
      );
    } else {
      setContacts((prevState) => [...prevState, contact]);
    }
  };

  const handleInputChange = (event) => {
    setFilter(event.currentTarget.value);
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
