import { createEntry } from "@/actions/entries";

export default function Form() {
    const formRef = useRef(null);

    async function handleAction(formData) {
        const res = await createEntry(formData);
        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <textarea name="text" placeholder="New Entry"></textarea>
            <button>Submit</button>
        </form>
    );
}
