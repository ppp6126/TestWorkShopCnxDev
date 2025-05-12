import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha , useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite, unsavafavorite } from '../Slice/favoritesSlice';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { checkLogin } from '../Slice/checkLoginSlice';

const urlpopular = "https://api.themoviedb.org/3/movie/popular?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&region="
const urlpopular2 = "&page="

const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&query=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&page=";

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '40%',
  },
}));

export default function Popular() {
  const count = useSelector((state) => state.counter.value);
  const region = 'us';
  const favorites = useSelector((state) => state.favorites.title);
  const [movie, setMovie] = useState([])
  const [img, setimg] = useState('https://image.tmdb.org/t/p/original')
  const [page, setPage] = useState(1);
  const [totalPage, setTotalpages] = useState(0);
  const [keyword, setKeyWord] = useState('');
  const dispatch = useDispatch();
  const [urlmovie, setUrlmovie] = useState('')
  const [checked, setChecked] = useState([]);

  const handleChangeFavorites = (event, newValue) => {
    console.log(favorites);
    console.log(newValue);
    var x = new Boolean(false);
    let i = 0;
    debugger
    if(favorites.length > 0){
      for (i = 0; i < favorites.length; i++) {
        if (favorites[i] === newValue) {
          console.log(favorites[i] + " === " + newValue)
          x = true;
          break;
        } else {
          console.log(favorites[i] + " !== " + newValue)
          x = false;
        }
      }
    }else{
      x = false;
    }
    if (x) {
      dispatch(unsavafavorite(newValue));
    } else {
      dispatch(savefavorite(newValue));
    }
  };

  const searchMovie = (event) => {
    console.log("value = " + event.target.value);
    setKeyWord(event.target.value);
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        console.log('enter press here! ')
        const key = event.target.value;
        var adult = new Boolean(false);
        if (count === 1) {
          adult = true;
        }
        const urls = urlSearch + key + urlSearch2 + adult + urlSearch3 +page ;
        console.log(urls);
        searchlistmoive(urls);
        setPage(1);
        setUrlmovie(urlSearch + key + urlSearch2 + adult + urlSearch3);
      } else {
        setPage(1);
        const u = urlpopular+region+urlpopular2 ;
        getlistmoive(u);
        setUrlmovie(u);
      }
      
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
    if (keyword !== '' || checked.length > 0) {
      searchlistmoive(urlmovie+value);
    } else {
      const url = urlpopular+region+urlpopular2+value ;
      getlistmoive(url);
    }

    window.scrollTo(0, 1);
  };

  const searchlistmoive = (url) => {
    console.log("searchlistmoive = "+url);
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        setMovie(result.results);
        setTotalpages(result.total_pages);
        console.log(result.total_pages);
      })
  }

  const getlistmoive = (url) => {
    const m = [];
    console.log("getlistmoive = "+url);
    if (count === 1) {
      fetch(url)
        .then(res => res.json())
        .then((result) => {
          setMovie(result.results);
          setTotalpages(result.total_pages);
        })
    } else {
      fetch(url)
        .then(res => res.json())
        .then((result) => {
          const r = [];
          r.push(result.results);
          let round = r[0].length;
          for (let i = 0; i < round; i++) {
            if (!result.results[i].adult) {
              m.push(result.results[i]);
            }
          }
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }
  useEffect(() => {
    dispatch(checkLogin(true));
    const m = [];
    const u = urlpopular + region + urlpopular2 + page;
    setUrlmovie(u);
    console.log("Status = " + u);
    if (count === 1) {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          setMovie(result.results);
          setTotalpages(result.total_pages);
          
        })
    } else {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          const r = [];
          r.push(result.results);
          let round = r[0].length;
          for (let i = 0; i < round; i++) {
            if (!result.results[i].adult) {
              m.push(result.results[i]);
            }
          }
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }, [region, count ])

  return (
      <div style={{ marginTop: '30px', marginLeft: '60px' ,textAlign: 'center' , marginRight: '60px'}}>
        <Search style={{ display: 'block', margin: 'auto' , color: 'black' , backgroundColor:'white'}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onKeyPressCapture={searchMovie} ></StyledInputBase>
        </Search>
        <Box sx={{ flexGrow: 1 }}>
          <Typography style={{color: 'white' , fontSize: '50px'}}>{'Popular'}</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {movie.map(m => {
                const type = "popular";
                const Tid = m.title;
                const value = m.vote_average / 2;
                const percentage =  m.vote_average *10 ;
                var f = "";
                for (let i = 0; i < favorites.length; i++) {
                  if (m.title === favorites[i]) {
                    f = favorites[i];
                    break;
                  }
                }
                return (
                  <Grid item xs="auto" style={{ textAlign: 'center' }} key={m.title}>
                    <Card sx={{ maxWidth: 345 }}>
                        <Grid>
                          <LazyLoadImage src={img + m.poster_path} width={"250"} height={"300"}></LazyLoadImage>
                            <div className='box' >{Tid}</div>
                          <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                        </Grid>
                      <Grid>
                        <BottomNavigation sx={{ width: 20 }} value={f} showLabels onChange={handleChangeFavorites} style={{ float: 'right', marginRight: '20px' }}>
                          <BottomNavigationAction value={m.title} icon={<FavoriteIcon />} />
                        </BottomNavigation>
                        <div style={{ marginLeft: '5px', width: 50, height: 50 }}>
                          < CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={15}
                            styles={buildStyles({ textColor: "#010101 ", pathColor: "#FE1919 ", trailColor: "#0D1809" , textSize: "26px"})}/>
                        </div>
                      </Grid>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <Stack style={{ alignItems: 'center', marginTop: '20px' , marginBottom: '20px' }}>
            <Typography style={{color: 'white'}} > {'page'}:{page}</Typography>
            <Pagination sx={{backgroundColor: 'white'}}  count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </Box>
      </div>
  );
}

