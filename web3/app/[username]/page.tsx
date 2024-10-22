export default function User({ params }: { params: { username: string } }) {



    return <div>username: {params.username.split("_").join(" ")}
    <div>the params should be the email will change it after</div>
    </div>
  }