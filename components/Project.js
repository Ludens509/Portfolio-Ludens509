class Project extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          tags: [
              { id: 0, title: 'all' },
              { id: 1, title: 'responsive' },
              { id: 2, title: 'mobile' },
              { id: 3, title: 'web' },
              { id: 4, title: 'javascript' },
              { id: 5, title: 'html' },
              { id: 6, title: 'react' },
          ],
          selectedTagIndex: 0,
          list: [
              { id: 0, src: 'assets/creaticshub.png', title: 'CreaticsHub', desc: 'In this project, I work with REACT and TYPESCRIPT to create the Front-End part of a web marketing plateform . ', demoLink: 'https://www.creaticshub.com/', codeLink: '#', tags: [1, 3, 6] },
              { id: 1, src: 'assets/mobile-app.jpg', title: 'Onboarding Page Shippex', desc: 'In this project, I work with REACT NATIVE to implement the onboarding Page . The design is from - Sylainx7@gmail.com -. ', demoLink: 'https://ludens509.github.io/Demo-onboarding/', codeLink: 'https://github.com/Ludens509/Onboarding-Screen-shipxx', tags: [2, 4, 6] },
              { id: 2, src: 'assets/interior_consultant.jpeg', title: 'Interior Consultant', desc: 'In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. ', demoLink: 'https://interior-consultantdevchallengesio.netlify.app/', codeLink: 'https://github.com/Ludens509/interior-consultant-master', tags: [3, 4, 5] },
              { id: 3, src: 'assets/recipe_page.jpeg', title: 'Recipe Page', desc: 'In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. ', demoLink: 'https://recipe-masterdevchallengesio.netlify.app/', codeLink: 'https://github.com/Ludens509/recipe-page-master', tags: [1, 3, 5] },
              { id: 4, src: 'assets/checkout_page.jpeg', title: 'Checkout Page', desc: 'In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. ', demoLink: 'https://checkout-blog-page.netlify.app/', codeLink: 'https://github.com/Ludens509/Checkout-Page-Challenge', tags: [1, 3] },
              { id: 5, src: 'assets/my_gallery.jpeg', title: 'My Gallery', desc: 'In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. ', demoLink: 'https://my-gallerydevchallengesio.netlify.app/', codeLink: 'https://github.com/Ludens509/My-gallery-master', tags: [3, 4, 5] },
              { id: 6, src: 'assets/team_page.jpeg', title: 'Team Page', desc: 'In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. ', demoLink: 'https://my-team-pagedevchallengesio.netlify.app/', codeLink: 'https://github.com/Ludens509/My-team-page-master', tags: [1, 3, 5] }
          ],
          data: [],
          firstPosition: 0,
          selectedPage: 1,
          dataSize: 0
      }
      const _list = this.generateList(this.state.firstPosition);
      this.state.data = _list;
      this.state.dataSize = this.state.list.length;
  }
  generateList = (position, dataSource = this.state.list) => {
      const _list = [...dataSource].slice(position, position + 3);
      return _list;
  }
  handleTagClick = (id) => {
      if (id !== 0) {
          let newlist = [];
          this.state.list.forEach(data => {
              if (data.tags.includes(id)) {
                  newlist.push(data);
              }
          });
          const listLenght = newlist.length;
          const i = this.generateList(0, newlist);
          this.setState({
              selectedTagIndex: id,
              data: i,
              dataSize: listLenght
          });
      } else {
          this.setState({
              selectedTagIndex: id,
              data: this.generateList(this.state.firstPosition),
              dataSize: this.state.list.length
          });
      }
  }
  handlePageSelection = (value) => {
      let list;
      if(this.state.selectedTagIndex !==0){
          let newlist = [];
          this.state.list.forEach(data => {
              if (data.tags.includes(this.state.selectedTagIndex)) {
                  newlist.push(data);
              }
          });
          list = this.generateList(value, newlist);
      }else{
          list = this.generateList(value);
      }
      this.setState({
          data: list
      });
  }
  render() {
      return (
          <div>
              <ProjectHeader tags={this.state.tags} selectedIndex={this.state.selectedTagIndex} tagClick={this.handleTagClick} count={this.state.list.length} />
              <ProjectList projects={this.state.data} tags={this.state.tags}/>
              <Pagination selectPage={this.handlePageSelection} datalength={this.state.dataSize} currentTag={this.state.selectedTagIndex}/>
          </div>
      );
  }
}

class Pagination extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          length: this.props.datalength,
          indexes: [],
          selectedPage: 1,
          tag : this.props.currentTag
      }
      var index = [];
      for (let i = 0; i < this.props.datalength; i++) {
          if (i % 3 === 0) {
              index = [...index, i];
          }
      }
      this.state.indexes = index;
  }
  componentWillReceiveProps(props){
      var index = [];
      for (let i = 0; i < props.datalength; i++) {
          if (i % 3 === 0) {
              index = [...index, i];
          }
      }
      this.setState({
          indexes : index
      });
      if(props.currentTag !== this.state.tag){
          this.setState({
              selectedPage : 1,
              tag : props.currentTag
          })
      }
  }
  handlePageChange = (e) => {
      let value = e.currentTarget.value;
      this.props.selectPage(value);
      this.setState({
          selectedPage: parseInt(e.currentTarget.innerText)
      });
  }
  handlePrevious = (e) => {
      if (this.state.selectedPage > 1) {
          const newIndex = this.state.indexes[this.state.selectedPage - 2];
          this.props.selectPage(newIndex);
          const newSelectedPage = this.state.selectedPage - 1;
          this.setState({
              selectedPage: newSelectedPage
          });
      }
  }
  handleNext = (e) => {
      if (this.state.selectedPage < this.state.indexes.length) {
          const newIndex = this.state.indexes[this.state.selectedPage];
          this.props.selectPage(newIndex);
          const newSelectedPage = this.state.selectedPage + 1;
          this.setState({
              selectedPage: newSelectedPage
          });
      }
  }
  render() {
      const pages = this.state.indexes.map((value, index) => {
          let j = index + 1;
          return this.state.selectedPage === j ? (
              <button key={index} onClick={this.handlePageChange} className="pagination pagination-number pagination-active" value={value}>{index + 1}</button>
          ) : (
                  <button key={index} onClick={this.handlePageChange} className="pagination pagination-number" value={value}>{index + 1}</button>
              );
      });
      return this.state.indexes.length !== 0 ? (
          <div className="pagination-list">
              <button className="pagination" onClick={this.handlePrevious}>&larr;</button>
              {pages}
              <button className="pagination" onClick={this.handleNext}>&rarr;</button>
          </div>
      ) : (
          <div className="pagination-error">
               <img src="assets/not-found-icon-4.png" />
          </div>
      );
  }
}

const ProjectList = ({ projects, tags }) => {
  const items = projects.map(data => {
      const tag = data.tags.map((element) => {
          return element === tags[element].id ? ("#"+tags[element].title+" ") : null;
      })
      return (
          <div className="card project-item" key={data.id}>
              <img className="project-item-img" src={data.src} />
              <div className="project-item-group">
                  <small className="project-item-tags">{tag}</small>
                  <div className="project-item-img-title-group">
                      <h3 className="project-item-title">{data.title}</h3>
                      <p className="project-item-desc">{data.desc}</p>
                  </div>
                  <div className="project-item-links">
                      <a target="_blank" href={data.demoLink} className="project-item-btn">Demo</a>
                      <a target="_blank" href={data.codeLink} className="project-item-btn btn-white">Code</a>
                  </div>
              </div>
          </div>
      );
  });
  return (
      <div className="project-list">
          {items}
      </div>
  );
}

const ProjectHeader = (props) => {
  const { tagClick, tags, selectedIndex, count } = props;
  const tagList = tags.map(tag => {
      return selectedIndex === tag.id ? (
          <span className="project-tag project-tag-active" onClick={() => { tagClick(tag.id) }} key={tag.id}>{tag.title}</span>
      ) : (<span className="project-tag" onClick={() => { tagClick(tag.id) }} key={tag.id}>{tag.title}</span>);
  });
  return (
      <div className="card card--project">
          {count > 1 ? ('Projects (' + count + ')') : ('Project (' + count + ')')}
          <div className="card--project-tags">
              {tagList}
          </div>
      </div>
  );
}



const element = <React.StrictMode><Project /></React.StrictMode>;
ReactDOM.render(element, document.querySelector('.project'));