export default function Demo() {
  const frameworks = ["React", "Vue", "Angular"];
  return <div>
    <h3>Frameworks de JavaScript</h3>
        <ul>
            {
                frameworks.map((framework, index) => {
                    return <li key={index}>{framework}</li>
                })
            }
        </ul>
  </div>
}